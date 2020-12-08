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
import { strings } from '@angular-devkit/core';
import { plural } from 'pluralize';
import { Schema } from './schema';

export function generateResourceTestingSpecs(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Validate that given service exists
    if (
      !tree
        .getDir('./services')
        .subdirs.map((item) => item.toString())
        .includes(_options.service)
    ) {
      throw new SchematicsException('Given service does not exist');
    }

    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        identity,
        plural
      })
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}

let identity = (x: any): any => x;
