module.exports = CardCollection = Backbone.Collection.extend({
  model: Card,
  url: API_URL
});
