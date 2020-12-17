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
  getSchematic: getSchematic,
  getCollection: getCollection
};
