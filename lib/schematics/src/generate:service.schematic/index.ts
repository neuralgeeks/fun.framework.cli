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
// import { Observable } from 'rxjs';
// import * as inquirer from 'inquirer';
import { strings } from '@angular-devkit/core';
import { Schema } from './schema';

export function generateService(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // // TODO: MOVE THIS TO GENERATE RESOURCE
    // const observer = new Observable<Tree>((observer) => {
    //   // Getting directories
    //   let directories = tree.root.subdirs;

    //   inquirer
    //     .prompt([
    //       {
    //         type: 'list',
    //         name: 'service',
    //         message: 'Wich service would you like your resource to be created?',
    //         choices: directories
    //       }
    //     ])
    //     .then((answers) => {
    //       console.log(answers);
    //       observer.next(tree);
    //       observer.complete();
    //     })
    //     .catch((error: any) => {
    //       observer.error(error);
    //     });
    // });

    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Validate that given service exists
    if (tree.exists(`.services/${_options.name}.service`)) {
      throw new SchematicsException('Service already exist');
    }

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
