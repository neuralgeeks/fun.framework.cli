const IndexValidator = require('./index.validator');
const StoreValidator = require('./store.validator');
const ShowValidator = require('./show.validator');
const UpdateValidator = require('./update.validator');
const DestroyValidator = require('./destroy.validator');
const ShowWithValidator = require('./showWith.validator');
const AnnouncementValidator = require('./announcement.validator');

module.exports = {
  RestValidators: {
    index: IndexValidator,
    store: StoreValidator,
    show: ShowValidator,
    update: UpdateValidator,
    destroy: DestroyValidator
  },
  showWith: ShowWithValidator,
  announcement: AnnouncementValidator
};
