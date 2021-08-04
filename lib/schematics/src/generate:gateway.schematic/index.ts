import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  apply,
  mergeWith,
  template,
  url,
  chain
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as prettier from 'prettier';
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

export function generateGateway(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Validate that given service exists
    if (tree.exists(`./${strings.dasherize(_options.name)}.service`)) {
      throw new SchematicsException('Service already exist');
    }

    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      })
    ]);

    return chain([
      mergeWith(sourceParametrizedTemplates),
      addServiceToStartConfig(_options),
      npmInstall(_options)
    ]);
  };
}

function addServiceToStartConfig(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Reading init.config.json
    const initConfigJSONBuffer = tree.read('./init.config.json');
    if (!initConfigJSONBuffer) {
      throw new SchematicsException(
        "Failed to read project's init.config.json"
      );
    }
    let startConfig: any = JSON.parse(initConfigJSONBuffer.toString());

    // Adding the new service
    startConfig.services.push({
      service: `${strings.dasherize(_options.name)}.service`,
      port: _options.port,
      name: `${strings.capitalize(strings.dasherize(_options.name))} service`
    });

    // Updating the start.config.json
    tree.overwrite(
      './init.config.json',
      prettier.format(JSON.stringify(startConfig), { parser: 'json' })
    );
  };
}

function npmInstall(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(
      new NodePackageInstallTask({
        workingDirectory: `${
          _options.scope ? `${_options.scope}` : '.'
        }/${strings.dasherize(_options.name)}.service`
      })
    );
    return tree;
  };
}
