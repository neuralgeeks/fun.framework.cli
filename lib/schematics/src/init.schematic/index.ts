import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  template,
  url
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function init(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Template source
    const sourceTemplates = url('./templates');

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      })
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}
