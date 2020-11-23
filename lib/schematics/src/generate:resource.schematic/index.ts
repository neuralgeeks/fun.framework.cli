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

      // TODO: Generate reporitory
      // TODO: Generate rest validators
      // TODO: Generate routes
      // TODO: Generate transforms

      return chain([controllerRule, modelRule]);
    };
  };
}
