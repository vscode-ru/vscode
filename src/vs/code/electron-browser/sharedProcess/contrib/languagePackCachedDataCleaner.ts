/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { join } from 'vs/base/common/path';
import { exists, Promises, readdir, rimraf } from 'vs/base/node/pfs';
import { IStringDictionary } from 'vs/base/common/collections';
import { IProductService } from 'vs/platform/product/common/productService';
import { Disposable } from 'vs/base/common/lifecycle';
import { onUnexpectedError } from 'vs/base/common/errors';
import { ILogService } from 'vs/platform/log/common/log';
import { INativeEnvironmentService } from 'vs/platform/environment/common/environment';
import { RunOnceScheduler } from 'vs/base/common/async';

interface ExtensionEntry {
	version: string;
	extensionIdentifier: {
		id: string;
		uuid: string;
	};
}

interface LanguagePackEntry {
	hash: string;
	extensions: ExtensionEntry[];
}

interface LanguagePackFile {
	[locale: string]: LanguagePackEntry;
}

export class LanguagePackCachedDataCleaner extends Disposable {

	private readonly _DataMaxAge = this.productService.quality !== 'stable'
		? 1000 * 60 * 60 * 24 * 7 		// roughly 1 week (insiders)
		: 1000 * 60 * 60 * 24 * 30 * 3; // roughly 3 months (stable)

	constructor(
		@INativeEnvironmentService private readonly environmentService: INativeEnvironmentService,
		@ILogService private readonly logService: ILogService,
		@IProductService private readonly productService: IProductService
	) {
		super();

		// We have no Language pack support for dev version (run from source)
		// So only cleanup when we have a build version.
		if (this.environmentService.isBuilt) {
			const scheduler = this._register(new RunOnceScheduler(() => {
				this.cleanUpLanguagePackCache();
			}, 40 * 1000 /* after 40s */));
			scheduler.schedule();
		}
	}

	private async cleanUpLanguagePackCache(): Promise<void> {
		this.logService.info('[language pack cache cleanup]: Starting to clean up unused language packs.');

		try {
			const installed: IStringDictionary<boolean> = Object.create(null);
			const metaData: LanguagePackFile = JSON.parse(await Promises.readFile(join(this.environmentService.userDataPath, 'languagepacks.json'), 'utf8'));
			for (let locale of Object.keys(metaData)) {
				const entry = metaData[locale];
				installed[`${entry.hash}.${locale}`] = true;
			}

			// Cleanup entries for language packs that aren't installed anymore
			const cacheDir = join(this.environmentService.userDataPath, 'clp');
			const cacheDirExists = await exists(cacheDir);
			if (!cacheDirExists) {
				return;
			}

			for (let entry of await readdir(cacheDir)) {
				if (installed[entry]) {
					this.logService.info(`[language pack cache cleanup]: Skipping folder ${entry}. Language pack still in use.`);
					continue;
				}

				this.logService.info(`[language pack cache cleanup]: Removing unused language pack: ${entry}`);

				await rimraf(join(cacheDir, entry));
			}

			const now = Date.now();
			for (let packEntry of Object.keys(installed)) {
				const folder = join(cacheDir, packEntry);
				for (let entry of await readdir(folder)) {
					if (entry === 'tcf.json') {
						continue;
					}

					const candidate = join(folder, entry);
					const stat = await Promises.stat(candidate);
					if (stat.isDirectory()) {
						const diff = now - stat.mtime.getTime();
						if (diff > this._DataMaxAge) {
							this.logService.info(`[language pack cache cleanup]: Removing language pack cache folder: ${join(packEntry, entry)}`);

							await rimraf(candidate);
						}
					}
				}
			}
		} catch (error) {
			onUnexpectedError(error);
		}
	}
}
