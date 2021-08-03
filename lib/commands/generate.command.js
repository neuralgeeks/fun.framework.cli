const { run } = require('../schematics/API/engine');
const { version } = require('../../package.json');

/**
 * @license
 * Copyright 2020 neuralgeeks LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let generate = async (path, command) => {
  if (command === 'service')
    run(
      path,
      'generate-service',
      { version: version },
      { dryRun: false, debug: false, force: false }
    );
  else if (command === 'resource')
    run(
      path,
      'generate-resource',
      { version: version },
      { dryRun: false, debug: false, force: false }
    );
};

module.exports = generate;
