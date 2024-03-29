/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Gets a collection from an engine given the name of the collection.
 */
let getCollection = (engine, collectionName) =>
  engine.createCollection(collectionName);

/**
 * Gets a schematic from an engine given the name of the schematic.
 */
let getSchematic = (collection, schematicName, allowPrivate) =>
  collection.createSchematic(schematicName, allowPrivate);

module.exports = {
  getSchematic,
  getCollection
};
