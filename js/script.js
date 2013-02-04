// Strict Mode engaged!
'use strict';

// Temporary root for router
var APP_ROOT = '/~michal/tadbit/';
// Temporary url for api
var API_URL = 'http://localhost:8124/cards';

// Setting up Card Model with our RESTful API
var Card = Backbone.Model.extend({
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

// Setting up Card View
var CardView = Backbone.View.extend({
  tagName: 'ul',
  className: 'card span4',
  template: _.template( $('#card_template').html() ),

  events: {
    "click": "display"
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    // Setting element id to card id from database
    this.el.id = this.model.attributes._id;
    // Setting the HTML to the template filled with the model's data
    console.log(this.model.toJSON());
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function() {
    $(this.el).remove();
  },

  display: function() {
    TadbitApp.navigate('cards/' + this.model.attributes._id, true);
  }
});

// Setting up Card Collection with our RESTful API
var CardCollection = Backbone.Collection.extend({
  model: Card,
  url: API_URL
});

// Setting up Card Collection View
var CardCollectionView = Backbone.View.extend({
  // Linking to element on the page
  el: $('#card_collection'),

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.addCard, this);
  },

  render: function() {
    // Clear in case
    $(this.el).html('');
    // Using addCard method to preserve context of 'this' in forEach
    this.collection.forEach(this.addCard, this);
  },

  addCard: function(card) {
    var cardView = new CardView({ model: card });
    // Appending the html generated by CardView's render function
    $(this.el).append(cardView.render().el);
    console.log(this.el);
  }
});

// Setting up the whole app definition
var TadbitApp = new (Backbone.Router.extend({
  routes:  { '': 'index', 'cards/:id': 'show_card'},

  initialize: function() {
    this.cardCollection = new CardCollection();
    this.cardCollectionView = new CardCollectionView({
      collection: this.cardCollection
    });
  },

  start: function() {
    Backbone.history.start({
      pushState: true,
      root: APP_ROOT
    });
  },

  index: function() {
    this.cardCollection.fetch();
  },

  show_card: function(id) {
    // TODO: UGLY, make betters
    var card = new Card({ id: id });
    var cardView = new CardView({ model: card});
    card.fetch();
    $('#card_collection').html(cardView.render().el);
  }
}));

// Called when page is done loading
$(function() {
  // Starts up our entire app
  TadbitApp.start();

  // Temp solution to add cards via form
  $('#add_submit').click( function() {
    createCard($('#input_question').val(),
               $('#input_answer').val(),
               $('#input_difficulty').val(),
               $('#input_tags').val());
    // Making sure to reset the form when done
    $('#add_reset').click();
  });
});

// Testing the creation of a single card
function createCard(question, answer, difficulty, tags) {
  var card = new Card();

  card.set({ question: question });
  card.set({ answer: answer });
  card.set({ difficulty: difficulty });
  card.set({ tags: tags });

  card.save();
}

// Testing the destruction of a single card
function destroyCard(card_id) {
  var card = new Card({ id: card_id} );

  card.destroy();
}
