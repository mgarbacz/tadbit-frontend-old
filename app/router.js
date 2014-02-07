var CardModel = require('models/card'),
    CardView = require('views/card'),
    CardCollection = require('models/cards'),
    CardCollectionView = require('views/cards'),
    config = require('config');

module.exports = TadbitRouter = Backbone.Router.extend({
  routes:  {
    '': 'index',
    'cards': 'indexCards',
    'cards/new': 'newCard',
    'cards/:id': 'showCard',
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
    // TODO: UGLY, make betters
    var cardModel = this.cardCollection.get(id);
    var cardView = new CardView({ model: cardModel});
    $('#card-collection').html(cardView.render().el);
  },

  newCard: function() {
    var NewCardTemplate = require('views/templates/card/new');
    $('#main').html(NewCardTemplate());
  },

  showError: function() {
    alert('That pages doesn\'t exist!');
  }
});
