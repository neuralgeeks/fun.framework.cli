import * as ts from 'typescript';

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

/**
 * Creates a typescript source file given its UTF-8 content.
 * Returns the ts.Node that represents the whole file.
 */
export function createSourceFile(
  content: string,
  name: string = 'file.ts'
): ts.Node {
  return ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true);
}

/**
 * Recursively matches a regex inside a ts.Node.
 * Returns true if the ts.Node contains directly or indirectly (through children)
 * a text that matches the regex.
 */
export function matchTextFromNode(node: ts.Node, regex: RegExp): boolean {
  if (node.getChildCount() === 0) return !!node.getText().match(regex);

  return node
    .getChildren()
    .map((child) => matchTextFromNode(child, regex))
    .reduce((a, b) => a || b, false);
}
