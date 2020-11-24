import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
  chain
} from '@angular-devkit/schematics';
import * as inquirer from 'inquirer';
import { Schema } from './schema';
import { generateController } from '../generate:controller.schematic/index';
import { generateModel } from '../generate:model.schematic/index';
import { generateRepository } from '../generate:repository.schematic/index';
import { generateRoutes } from '../generate:routes.schematic/index';
import { generateTransform } from '../generate:transform.schematic/index';

export function generateResource(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return async (): Promise<Rule> => {
      // Validate that root is a fun.framework project
      if (!tree.exists('./fun-cli.json')) {
        throw new SchematicsException('Folder is not a fun.framework project');
      }

      // Getting services
      let services = tree.getDir('./services').subdirs;

      // Picking service
      let answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'service',
          message: 'Wich service would you like your resource to be created?',
          choices: services
        }
      ]);

      let service = answers.service;

      // Generate controller
      let controllerRule = generateController({
        name: _options.name,
        service: service
      });

      // Generate model
      let modelRule = generateModel({
        name: _options.name,
        service: service
      });

      // Generate reporitory
      let repositoryRule = generateRepository({
        name: _options.name,
        service: service
      });

      // TODO: Generate rest validator

      // Generate routes
      let routesRule = generateRoutes({
        name: _options.name,
        service: service
      });

      // Generate transform
      let transformRule = generateTransform({
        name: _options.name,
        service: service
      });

      return chain([
        controllerRule,
        modelRule,
        repositoryRule,
        routesRule,
        transformRule
      ]);
    };
  };
}
