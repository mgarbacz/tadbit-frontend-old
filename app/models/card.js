var config = require('config');

module.exports = Card = Backbone.Model.extend({
  urlRoot: config.apiUrl,
  idAttribute: '_id',
  // TODO: THIS IS BAD, fix error-checking
  defaults: {
    _id: '',
    question: '',
    answer: '',
    difficulty: '',
    tags: ''
  }
});
