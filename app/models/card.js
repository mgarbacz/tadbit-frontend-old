var config = require('config');

module.exports = Card = Backbone.Model.extend({
  urlRoot: config.apiUrl,
  idAttribute: '_id',
});
