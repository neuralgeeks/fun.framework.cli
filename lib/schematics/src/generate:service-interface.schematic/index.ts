import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  apply,
  mergeWith,
  template,
  url
} from '@angular-devkit/schematics';
import * as inquirer from 'inquirer';
import { singular } from 'pluralize';
import { strings } from '@angular-devkit/core';
import { plural } from 'pluralize';
import { Schema } from './schema';

/**
 * @license
 * Copyright 2021 neuralgeeks LLC.
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

export function generateServiceInterface(_options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Making sure the name is singular
    _options.name = singular(_options.name);

    // Getting services
    let services = tree
      .getDir('./')
      .subdirs.filter((item) => item.toString().includes('.service'));

    // Picking service
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'service',
        message: 'Which service would you like your resource to be created?',
        choices: services
      }
    ]);

    let service = answers.service;

    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        service,
        ..._options,
        ...strings,
        identity,
        plural
      })
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}

let identity = (x: any): any => x;
