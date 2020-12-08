const Sequencer = require('@jest/test-sequencer').default;
const path = require('path');

/**
 * Order:
 * - index
 * - show
 * - update
 * - store
 * - other
 * - delete
 */
const order = ['index', 'show', 'update', 'store', 'other', 'destroy'];
const types = ['index', 'show', 'update', 'store', 'destroy'];

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort(this.sortRestSpecs);
  }

  sortRestSpecs(testA, testB) {
    let getRestSpecType = (test) => {
      let name = path.basename(test.path);
      for (let restSpecType of types) {
        if (name.includes(restSpecType)) return restSpecType;
      }
      return 'other';
    };

    let restSpecTypeA = getRestSpecType(testA);
    let restSpecTypeB = getRestSpecType(testB);

    return order.indexOf(restSpecTypeA) < order.indexOf(restSpecTypeB) ? -1 : 1;
  }
}

module.exports = CustomSequencer;
