/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { basename, dirname, join } from 'vs/base/common/path';
import { onUnexpectedError } from 'vs/base/common/errors';
import { Disposable } from 'vs/base/common/lifecycle';
import { Promises, readdir, rimraf } from 'vs/base/node/pfs';
import { IProductService } from 'vs/platform/product/common/productService';
import { RunOnceScheduler } from 'vs/base/common/async';
import { ILogService } from 'vs/platform/log/common/log';

export class CodeCacheCleaner extends Disposable {

	private readonly _DataMaxAge = this.productService.quality !== 'stable'
		? 1000 * 60 * 60 * 24 * 7 		// roughly 1 week (insiders)
		: 1000 * 60 * 60 * 24 * 30 * 3; // roughly 3 months (stable)

	constructor(
		codeCachePath: string | undefined,
		@IProductService private readonly productService: IProductService,
		@ILogService private readonly logService: ILogService
	) {
		super();

		// Cached data is stored as user data and we run a cleanup task everytime
		// the editor starts. The strategy is to delete all files that are older than
		// 3 months (1 week respectively)
		if (codeCachePath) {
			const scheduler = this._register(new RunOnceScheduler(() => {
				this.cleanUpCodeCaches(codeCachePath);
			}, 30 * 1000 /* after 30s */));
			scheduler.schedule();
		}
	}

	private async cleanUpCodeCaches(codeCachePath: string): Promise<void> {
		this.logService.info('[code cache cleanup]: Starting to clean up old code cache folders.');

		try {
			const now = Date.now();

			// The folder which contains folders of cached data.
			// Each of these folder is per version
			const codeCacheRootPath = dirname(codeCachePath);
			const codeCacheCurrent = basename(codeCachePath);

			const entries = await readdir(codeCacheRootPath);
			await Promise.all(entries.map(async entry => {
				if (entry === codeCacheCurrent) {
					return; // not the current cache folder
				}

				// Delete cache folder if old enough
				const path = join(codeCacheRootPath, entry);
				const stat = await Promises.stat(path);
				if (stat.isDirectory() && (now - stat.mtime.getTime()) > this._DataMaxAge) {
					this.logService.info(`[code cache cleanup]: Removing code cache folder ${entry}.`);

					return rimraf(path);
				}
			}));
		} catch (error) {
			onUnexpectedError(error);
		}
	}
}
