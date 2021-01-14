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
import { plural } from 'pluralize';
import * as prettier from 'prettier';
import * as ts from 'typescript';
import {
  createSourceFile,
  matchTextFromNode
} from '../../utility/typescript/expressions';
import { InsertChange } from '../../utility/change';
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

export function generateRoutes(_options: Schema): Rule {
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

    return chain([
      mergeWith(sourceParametrizedTemplates),
      addRouteDeclarationToApp(_options)
    ]);
  };
}

function addRouteDeclarationToApp(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const appPath = `./services/${_options.service}/app.js`;
    const app = tree.read(appPath);
    if (!app) {
      throw new SchematicsException(
        'Given service does not exist or does not have a valid app entry point'
      );
    }

    const appContent = app.toString('utf-8');
    const sourceFile = createSourceFile(appContent);

    // Listing all children
    const syntaxList = sourceFile.getChildren()[0];
    const children = syntaxList.getChildren();

    let referenceExpression: ts.Node;
    let toInsertContent: string;

    // Search for the last route require expression
    const lastRouteRequireExpression = children
      .filter((x) => matchTextFromNode(x, /\.\/src\/routes\/[^]*\.route/))
      .pop();

    // If there is no route declared in the app
    if (!lastRouteRequireExpression) {
      // Search for the database setup expression
      const databaseSetupExpression = children
        .filter((x) => matchTextFromNode(x, /\.\/src\/database\/connection/))
        .pop();

      if (!databaseSetupExpression) {
        throw new SchematicsException(
          'Given service does not have a valid app entry point'
        );
      }

      // The database setup is the reference expression
      referenceExpression = databaseSetupExpression;
      toInsertContent = _getRouteDeclarationToInsertContent(_options, true);
    } else {
      /*
       * The expression following the last route require expression is the reference
       * This is, the app.use(..., ...Router) expression
       */
      referenceExpression =
        children[children.indexOf(lastRouteRequireExpression) + 1];
      toInsertContent = _getRouteDeclarationToInsertContent(_options, false);
    }

    // Creating the insert change
    const change = new InsertChange(
      appPath,
      referenceExpression.end,
      toInsertContent
    );

    // Commiting the insert change
    const declarationRecorder = tree.beginUpdate(appPath);
    declarationRecorder.insertLeft(change.pos, change.toAdd);

    tree.commitUpdate(declarationRecorder);
    return tree;
  };
}

function _getRouteDeclarationToInsertContent(
  _options: Schema,
  firstDeclaration: boolean
): string {
  let content = `const ${strings.camelize(
    _options.name
  )}Router = require('./src/routes/${strings.dasherize(_options.name)}.routes');
    app.use('/${plural(strings.camelize(_options.name))}', ${strings.camelize(
    _options.name
  )}Router);`;

  if (firstDeclaration) {
    content = `
    // ------------------------ routes -------------------------- //
    ${content}
    `;
  }

  // TODO: use .prettierc of the current project
  return `${firstDeclaration ? '\n\n' : '\n'}${prettier.format(content, {
    trailingComma: 'none',
    parser: 'babel',
    tabWidth: 2,
    semi: true,
    singleQuote: true
  })}`.slice(0, -1);
}

let identity = (x: any): any => x;
