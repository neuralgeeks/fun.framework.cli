const colors = require('ansi-colors');
const { logging } = require('@angular-devkit/core');
let { toArray } = require('rxjs/operators');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

module.exports = {
  /**
   * Creates an observable logger for the fun-cli schematic run.
   * When the logger observable is completed, the logs are
   * printed using ANSI colors.
   */
  createLogger: (name) => {
    let logger = new logging.Logger(name);
    logger
      .pipe(toArray())
      .toPromise()
      .then((observed) => {
        observed.forEach((log) => {
          switch (log.level) {
            case 'debug':
              console.log(
                `${colors.bgCyan(colors.black('DEBUG'))}`,
                log.message
              );
              break;
            case 'error':
              console.log(
                `${colors.bgRed(colors.bold('ERROR'))}`,
                `${colors.red(colors.bold(log.message))}`
              );
              break;
            case 'fatal':
              console.log(
                `${colors.bgRedBright(colors.bold('FATAL'))}`,
                `${colors.redBright(colors.bold(log.message))}`
              );
              break;
            case 'info':
              console.log(log.message);
              break;
            case 'warn':
              console.log(
                `${colors.bgYellowBright(colors.black('WARN'))}`,
                log.message
              );
              break;
          }
        });
      });

    return logger;
  }
};
