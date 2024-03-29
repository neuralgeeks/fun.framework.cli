import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  template,
  url,
  chain,
  applyToSubtree
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { generateService } from '../generate:service.schematic/index';
import { generateGateway } from '../generate:gateway.schematic';
import { Schema } from './schema';

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

export function init(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      })
    ]);

    // Base rules, merging the template
    let rules: [Rule] = [mergeWith(sourceParametrizedTemplates)];

    // Generation the API service if wanted
    if (_options.shouldGenerateService) {
      // Generate service using 'generate-service' schematic
      rules.push(
        applyToSubtree(normalize(`./${strings.dasherize(_options.name)}`), [
          generateService({
            name: 'api',
            scope: `./${strings.dasherize(_options.name)}`,
            version: _options.version,
            port: 3111
          })
        ])
      );
    }

    // Generation the gateway service if wanted
    if (_options.shouldGenerateGateway) {
      // Generate service using 'generate-gateway' schematic
      rules.push(
        applyToSubtree(normalize(`./${strings.dasherize(_options.name)}`), [
          generateGateway({
            name: 'gateway',
            scope: `./${strings.dasherize(_options.name)}`,
            version: _options.version,
            port: 3110
          })
        ])
      );
    }

    // Return the chain of all rules
    return chain(rules)(tree, _context);
  };
}
