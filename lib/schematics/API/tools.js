let getCollection = (engine, collectionName) =>
  engine.createCollection(collectionName);

let getSchematic = (collection, schematicName, allowPrivate) =>
  collection.createSchematic(schematicName, allowPrivate);

module.exports = {
  getSchematic: getSchematic,
  getCollection: getCollection
};
