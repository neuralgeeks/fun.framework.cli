import * as ts from 'typescript';

export function createSourceFile(
  content: string,
  name: string = 'file.ts'
): ts.Node {
  return ts.createSourceFile(name, content, ts.ScriptTarget.Latest, true);
}

export function matchTextFromNode(node: ts.Node, regex: RegExp): boolean {
  if (node.getChildCount() === 0) return !!node.getText().match(regex);

  return node
    .getChildren()
    .map((child) => matchTextFromNode(child, regex))
    .reduce((a, b) => a || b, false);
}
