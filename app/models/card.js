module.exports = Card = Backbone.Model.extend({
  urlRoot: API_URL,
  // TODO: THIS IS BAD, fix error-checking
  defaults: {
    _id: '',
    question: '',
    answer: '',
    difficulty: '',
    tags: ''
  }
});
