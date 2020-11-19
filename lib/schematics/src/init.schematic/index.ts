import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function init(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    let { name, color } = _options;
    tree.create(
      'fun.js',
      `console.log('This is a sample, hello ${name}. Your favorite color is ${color}')`
    );
    return tree;
  };
}
