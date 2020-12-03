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
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { generateService } from '../generate:service.schematic/index';
import { Schema } from './schema';

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
      // Generate service and delegate npm install to 'generate-service' schematic
      rules.push(
        applyToSubtree(normalize(`./${strings.dasherize(_options.name)}`), [
          generateService({
            name: 'API',
            scope: `./${strings.dasherize(_options.name)}`
          })
        ])
      );
    } else {
      // Run npm install
      rules.push(
        applyToSubtree(normalize(`./${strings.dasherize(_options.name)}`), [
          npmInstall(_options)
        ])
      );
    }

    // Return the chain of all rules
    return chain(rules)(tree, _context);
  };
}

function npmInstall(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(
      new NodePackageInstallTask({
        workingDirectory: `./${strings.dasherize(_options.name)}`
      })
    );
    return tree;
  };
}
