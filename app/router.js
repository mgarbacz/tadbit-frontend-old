var CardModel = require('models/card'),
    CardView = require('views/card'),
    CardCollection = require('models/cards'),
    CardCollectionView = require('views/cards');
    config = require('config');

module.exports = TadbitRouter = Backbone.Router.extend({
  routes:  {
    '': 'index',
    'cards/:id': 'showCard',
    'cards/new': 'newCard'
  },

  initialize: function() {
    this.cardCollection = new CardCollection();
    this.cardCollectionView = new CardCollectionView({
      collection: this.cardCollection
    });
  },

  start: function() {
    Backbone.history.start({
      pushState: true,
      root: config.appRoot
    });
  },

  index: function() {
    this.cardCollection.fetch();
  },

  showCard: function(id) {
    // TODO: UGLY, make betters
    var cardModel = this.cardCollection.get(id);
    var cardView = new CardView({ model: cardModel});
    $('#card-collection').html(cardView.render().el);
  },

  newCard: function() {
    console.log('New card page');
  }
});
