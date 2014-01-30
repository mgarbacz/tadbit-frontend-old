var config = require('config');

module.exports = CardCollection = Backbone.Collection.extend({
  model: Card,
  url: config.apiUrl
});
