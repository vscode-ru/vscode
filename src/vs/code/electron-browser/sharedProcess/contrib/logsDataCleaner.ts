/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IEnvironmentService } from 'vs/platform/environment/common/environment';
import { join, dirname, basename } from 'vs/base/common/path';
import { readdir, rimraf } from 'vs/base/node/pfs';
import { onUnexpectedError } from 'vs/base/common/errors';
import { Disposable } from 'vs/base/common/lifecycle';
import { Promises, RunOnceScheduler } from 'vs/base/common/async';
import { ILogService } from 'vs/platform/log/common/log';

export class LogsDataCleaner extends Disposable {

	constructor(
		@IEnvironmentService private readonly environmentService: IEnvironmentService,
		@ILogService private readonly logService: ILogService
	) {
		super();

		const scheduler = this._register(new RunOnceScheduler(() => {
			this.cleanUpOldLogs();
		}, 10 * 1000 /* after 10s */));
		scheduler.schedule();
	}

	private async cleanUpOldLogs(): Promise<void> {
		this.logService.info('[logs cleanup]: Starting to clean up old logs.');

		try {
			const currentLog = basename(this.environmentService.logsPath);
			const logsRoot = dirname(this.environmentService.logsPath);

			const children = await readdir(logsRoot);

			const allSessions = children.filter(name => /^\d{8}T\d{6}$/.test(name));
			const oldSessions = allSessions.sort().filter((d, i) => d !== currentLog);
			const toDelete = oldSessions.slice(0, Math.max(0, oldSessions.length - 9));

			if (toDelete.length > 0) {
				this.logService.info(`[logs cleanup]: Removing log folders '${toDelete.join(', ')}'`);

				await Promises.settled(toDelete.map(name => rimraf(join(logsRoot, name))));
			}
		} catch (error) {
			onUnexpectedError(error);
		}
	}
}
