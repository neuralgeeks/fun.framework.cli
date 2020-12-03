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
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { Schema } from './schema';

export function generateService(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Validate that root is a fun.framework project
    if (!tree.exists('./fun-cli.json')) {
      throw new SchematicsException('Folder is not a fun.framework project');
    }

    // Validate that given service exists
    if (tree.exists(`./services/${strings.dasherize(_options.name)}.service`)) {
      throw new SchematicsException('Service already exist');
    }

    // Template source
    const sourceTemplates = url(`${__dirname}/templates`);

    // Applying template
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      })
    ]);

    return chain([
      mergeWith(sourceParametrizedTemplates),
      addServiceLocalDependencies(_options),
      npmInstall(_options)
    ]);
  };
}

function addServiceLocalDependencies(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJSONBuffer = tree.read(
      `./services/${strings.dasherize(_options.name)}.service/package.json`
    );
    if (!packageJSONBuffer) {
      throw new SchematicsException("Failed to read service's package.json");
    }
    const packageJSON: any = JSON.parse(packageJSONBuffer.toString());

    const nodeDependency: NodeDependency = _nodeDependencyFactory(
      `${packageJSON.name}`,
      `file:services/${strings.dasherize(_options.name)}.service`
    );
    addPackageJsonDependency(tree, nodeDependency);
  };
}

function npmInstall(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(
      new NodePackageInstallTask({
        workingDirectory: _options.scope ? `${_options.scope}` : './'
      })
    );
    return tree;
  };
}

function _nodeDependencyFactory(
  packageName: string,
  version: string
): NodeDependency {
  return {
    type: NodeDependencyType.Default,
    name: packageName,
    version: version,
    overwrite: true
  };
}
