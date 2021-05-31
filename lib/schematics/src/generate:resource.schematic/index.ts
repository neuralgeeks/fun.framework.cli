import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  chain
} from '@angular-devkit/schematics';
import * as inquirer from 'inquirer';
import { singular } from 'pluralize';
import { Schema, GranulatedElementsSelection } from './schema';
import { generateController } from '../generate:controller.schematic/index';
import { generateModel } from '../generate:model.schematic/index';
import { generateRepository } from '../generate:repository.schematic/index';
import { generateRoutes } from '../generate:routes.schematic/index';
import { generateTransform } from '../generate:transform.schematic/index';
import { generateRestValidators } from '../generate:rest-validators.schematic/index';
import { generateResourceTestingSpecs } from '../generate:resource-testing-spec.schematic/index';

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

export function generateResource(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return async (): Promise<Rule> => {
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

      // Picking elements to be generated
      let elementsAnswers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'granulatedElementsSelection',
          message:
            'Wich elements would you like to be generated with the resource?',
          choices: [
            'Controller',
            'Model',
            'Repository',
            'REST Validators',
            'Routes',
            'Transformer',
            'Testing specs'
          ].map((value) => {
            return { value: value, checked: true };
          })
        }
      ]);

      const elementsSelection = new GranulatedElementsSelection(
        elementsAnswers.granulatedElementsSelection
      );
      let ruleFactories: ((_options: any) => Rule)[] = [];

      // Generate controller
      if (elementsSelection.controller) ruleFactories.push(generateController);

      // Generate model
      if (elementsSelection.model) ruleFactories.push(generateModel);

      // Generate reporitory
      if (elementsSelection.repository) ruleFactories.push(generateRepository);

      // Generate rest validator
      if (elementsSelection.restValidators)
        ruleFactories.push(generateRestValidators);

      // Generate routes
      if (elementsSelection.routes) ruleFactories.push(generateRoutes);

      // Generate transform
      if (elementsSelection.transform) ruleFactories.push(generateTransform);

      // Generate testing specs
      if (elementsSelection.testingSpecs)
        ruleFactories.push(generateResourceTestingSpecs);

      return chain(
        ruleFactories.map((factory) =>
          factory({ ..._options, service: service })
        )
      );
    };
  };
}
