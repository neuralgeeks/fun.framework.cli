const path = require('path');
const inquirer = require('inquirer');
const colors = require('ansi-colors');
const { NodeWorkflow } = require('@angular-devkit/schematics/tools');
const {
  UnsuccessfulWorkflowExecution,
  formats
} = require('@angular-devkit/schematics');
const { schema, tags } = require('@angular-devkit/core');
const { createLogger } = require('./logger');
const { getSchematic, getCollection } = require('./tools');

// --------------------- Run --------------------- //
let run = async (
  root,
  name,
  { debug = true, dryRun = true, force = true } = {}
) => {
  let logger = createLogger('fun-cli.init');

  try {
    let error = false;
    let nothingDone = true;
    let allowPrivateSchematics = true;

    const options = {
      force: force,
      dryRun: dryRun,
      packageManager: 'npm',
      resolvePaths: [__dirname, process.cwd(), root],
      registry: new schema.CoreSchemaRegistry(formats.standardFormats),
      schemaValidation: true
    };

    const _workflow = new NodeWorkflow(root, options);

    _workflow.registry.usePromptProvider((definitions) => {
      const questions = definitions
        .filter(
          (definition) => !options.defaults || definition.default === undefined
        )
        .map((definition) => {
          const question = {
            name: definition.id,
            message: definition.message,
            default: definition.default
          };

          const validator = definition.validator;
          if (validator) {
            question.validate = (input) => validator(input);

            // Filter allows transformation of the value prior to validation
            question.filter = async (input) => {
              for (const type of definition.propertyTypes) {
                let value;
                switch (type) {
                  case 'string':
                    value = String(input);
                    break;
                  case 'integer':
                  case 'number':
                    value = Number(input);
                    break;
                  default:
                    value = input;
                    break;
                }
                // Can be a string if validation fails
                const isValid = (await validator(value)) === true;
                if (isValid) {
                  return value;
                }
              }

              return input;
            };
          }

          switch (definition.type) {
            case 'confirmation':
              question.type = 'confirm';
              break;
            case 'list':
              question.type = definition.multiselect ? 'checkbox' : 'list';
              question.choices = definition.items.map((item) => {
                return typeof item == 'string'
                  ? item
                  : {
                      name: item.label,
                      value: item.value
                    };
              });
              break;
            case 'input':
              if (
                definition.propertyTypes.size === 1 &&
                (definition.propertyTypes.has('number') ||
                  definition.propertyTypes.has('integer'))
              ) {
                question.type = 'number';
              } else {
                question.type = 'input';
              }
              break;
            default:
              question.type = definition.type;
              break;
          }

          return question;
        });

      return inquirer.prompt(questions);
    });

    let collection = getCollection(
      _workflow.engine,
      path.join(__dirname, '..', 'src', 'collection.json')
    );

    let schematic = getSchematic(collection, name, allowPrivateSchematics);
    let collectionName = schematic.collection.description.name;
    let schematicName = schematic.description.name;

    let input = {};
    let loggingQueue = [];

    _workflow.reporter.subscribe((event) => {
      nothingDone = false;

      // Strip leading slash to prevent confusion.
      const eventPath = event.path.startsWith('/')
        ? event.path.substr(1)
        : event.path;

      switch (event.kind) {
        case 'error':
          error = true;
          const desc =
            event.description == 'alreadyExist'
              ? 'already exists'
              : 'does not exist.';
          logger.warn(`ERROR! ${eventPath} ${desc}.`);
          break;
        case 'update':
          loggingQueue.push(tags.oneLine`
                ${colors.cyan('UPDATE')} ${eventPath} (${
            event.content.length
          } bytes)
              `);
          break;
        case 'create':
          loggingQueue.push(tags.oneLine`
                ${colors.green('CREATE')} ${eventPath} (${
            event.content.length
          } bytes)
              `);
          break;
        case 'delete':
          loggingQueue.push(`${colors.yellow('DELETE')} ${eventPath}`);
          break;
        case 'rename':
          const eventToPath = event.to.startsWith('/')
            ? event.to.substr(1)
            : event.to;
          loggingQueue.push(
            `${colors.blue('RENAME')} ${eventPath} => ${eventToPath}`
          );
          break;
      }
    });

    _workflow.lifeCycle.subscribe((event) => {
      if (event.kind == 'end' || event.kind == 'post-tasks-start') {
        if (!error) {
          // Output the logging queue, no error happened.
          loggingQueue.forEach((log) => logger.info(log));
        }

        loggingQueue = [];
        error = false;
      }
    });

    _workflow
      .execute({
        collection: collectionName,
        schematic: schematicName,
        options: input,
        debug: debug,
        logger: logger,
        allowPrivate: allowPrivateSchematics
      })
      .subscribe({
        error: (err) => {
          // In case the workflow was not successful, show an appropriate error message.
          if (err instanceof UnsuccessfulWorkflowExecution) {
            // "See above" because we already printed the error.
            logger.fatal('The Schematic workflow failed. See above.');
          } else if (debug) {
            logger.fatal(`An error occured:\n${err.message}\n${err.stack}`);
          } else {
            logger.fatal(err.message);
          }
          logger.complete();
        },
        complete: () => {
          if (nothingDone) {
            logger.info('Nothing to be done.');
          }
          if (dryRun) {
            logger.warn(`The "dryRun" flag means no changes were made.`);
          }
          logger.complete();
        }
      });
  } catch (e) {
    logger.fatal(e);
    logger.complete();
  }
};

module.exports = { run: run };
