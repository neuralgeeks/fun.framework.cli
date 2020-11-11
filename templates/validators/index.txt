const IndexValidator = require('./index.validator');
const StoreValidator = require('./store.validator');
const ShowValidator = require('./show.validator');
const UpdateValidator = require('./update.validator');
const DestroyValidator = require('./destroy.validator');

module.exports = {
  RestValidators: {
    index: IndexValidator,
    store: StoreValidator,
    show: ShowValidator,
    update: UpdateValidator,
    destroy: DestroyValidator
  }
};
