var CardModel = require('models/card'),
    CardView = require('views/card'),
    CardCollection = require('models/cards'),
    CardCollectionView = require('views/cards'),
    LoadingTemplate = require('views/templates/loading'),
    config = require('config');

module.exports = TadbitRouter = Backbone.Router.extend({
  routes:  {
    '': 'index',
    'cards': 'indexCards',
    'cards/new': 'newCard',
    'cards/:id': 'showCard',
    'tags': 'indexTags',
    '*error': 'showError' // match anything else and handle it as a 404 page
  },

  initialize: function() {
    this.cardCollection = new CardCollection();
  },

  start: function() {
    Backbone.history.start({
      pushState: true,
      root: config.appRoot
    });
  },

  index: function() {
  },

  indexCards: function() {
    this.cardCollectionView = new CardCollectionView({
      collection: this.cardCollection
    });
    this.cardCollection.fetch({ reset: true });
  },

  showCard: function(id) {
    var cardModel = this.cardCollection.get(id) || new CardModel({ _id: id });
    var cardView = new CardView({ model: cardModel});

    // TODO: UGLY, make betters
    $('#main').html(cardView.render().el);
    cardModel.fetch();
  },

  newCard: function() {
    var NewCardTemplate = require('views/templates/card/new');
    $('#main').html(NewCardTemplate());
  },

  indexTags: function() {
    $('#main').html(LoadingTemplate({ item: 'tag' }));
  },

  showError: function() {
    alert('That pages doesn\'t exist!');
  }
});
