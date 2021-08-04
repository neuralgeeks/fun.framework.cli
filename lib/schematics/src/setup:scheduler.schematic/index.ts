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
import * as inquirer from 'inquirer';
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
 * Copyright 2021 neuralgeeks LLC.
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

export function setupScheduler(_options: Schema): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Getting services
    let services = tree
      .getDir('./')
      .subdirs.filter((item) => item.toString().includes('.service'));

    // Picking service
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'service',
        message: "Select the service which's scheduler you would like to setup",
        choices: services
      }
    ]);

    let service = answers.service;

    // Validate that given service exists
    if (
      !tree
        .getDir('./')
        .subdirs.map((item) => item.toString())
        .filter((str) => str.includes('.service'))
        .includes(service)
    ) {
      throw new SchematicsException('Given service does not exist');
    }

    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        service,
        ..._options,
        ...strings,
        identity,
        plural
      })
    ]);

    return chain([
      mergeWith(sourceParametrizedTemplates),
      addDeclarationToApp(service, _options)
    ]);
  };
}

function addDeclarationToApp(service: string, _options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const appPath = `./${service}/app.js`;
    const app = tree.read(appPath);
    if (!app) {
      throw new SchematicsException(
        'Given service does not exist or does not have a valid app entry point. app.js not found.'
      );
    }

    const appContent = app.toString('utf-8');
    const sourceFile = createSourceFile(appContent);

    // Listing all children
    const [syntaxList] = sourceFile.getChildren();
    const children = syntaxList.getChildren();

    let referenceExpression: ts.Node;
    let toInsertContent: string;

    // Search for the last scheduler setup require expression
    const lastRequireExpression = children
      .filter((x) => matchTextFromNode(x, /\.\/src\/scheduler\/scheduler/))
      .pop();

    // If there is a scheduler setup declared in the app
    if (lastRequireExpression) {
      throw new SchematicsException('Scheduler setup was already complete');
    }

    // Search for the public directory expression
    const publicDirExpression = children
      .filter((x) => matchTextFromNode(x, /\/public/))
      .pop();

    if (!publicDirExpression) {
      throw new SchematicsException(
        'Given service does not have a valid app entry point. Server public dir expression not found.'
      );
    }

    // The public directory setup is the reference expression
    referenceExpression = publicDirExpression;
    toInsertContent = _getSetupDeclarationToInsertContent(_options);

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

function _getSetupDeclarationToInsertContent(_options: Schema): string {
  let content = `//----------------------- Scheduler ------------------------//
  const ApplicationScheduler = require('./src/scheduler/scheduler');
  const appScheduler = new ApplicationScheduler();
  if (args.listen) appScheduler.start();`;

  // TODO: use .prettierc of the current project
  return `\n\n${prettier.format(content, {
    trailingComma: 'none',
    parser: 'babel',
    tabWidth: 2,
    semi: true,
    singleQuote: true
  })}`.slice(0, -1);
}

let identity = (x: any): any => x;
