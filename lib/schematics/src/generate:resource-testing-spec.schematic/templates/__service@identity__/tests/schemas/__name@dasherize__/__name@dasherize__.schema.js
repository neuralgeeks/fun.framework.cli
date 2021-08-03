const relationships = require('./<%= dasherize(name) %>.relationships.schema');
const attributes = require('./<%= dasherize(name) %>.attributes.schema');
const schema = require('../../utils/schema');

module.exports = schema(attributes, relationships);
