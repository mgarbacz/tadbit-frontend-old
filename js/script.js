// Strict Mode engaged!
'use strict';

// Setting up Card Model with our RESTful API
var Card = Backbone.Model.extend({
  urlRoot: 'http://localhost:8124/cards'
});

// Setting up Card View
var CardView = Backbone.View.extend({
  tagName: 'ul',
  className: 'card span4',
  template: _.template( $('#card_template').html() ),

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    // Setting the HTML to the template filled with the model's data
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function() {
    $(this.el).remove();
  }
});

// Setting up Card Collection with our RESTful API
var CardCollection = Backbone.Collection.extend({
  model: Card,
  url: 'http://localhost:8124/cards'
});

// Setting up Card Collection View
var CardCollectionView = Backbone.View.extend({
  el: $('#card_collection'),

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.addCard, this);
  },

  render: function() {
    // Using addCard method to preserve context of 'this' in forEach
    this.collection.forEach(this.addCard, this);
  },

  addCard: function(card) {
    var card_view = new CardView({ model: card });
    // Appending the html generated by CardView's render function
    $(this.el).append(card_view.render().el);
    console.log(this.el);
  }
});

$(document).ready(function() {
  var card_collection = new CardCollection();
  var card_collection_view = new CardCollectionView({
    collection: card_collection
  });

  card_collection.fetch();
});

// Testing the creation of a single card
function createCard(question, answer, difficulty, tags) {
  var card = new Card();

  card.set({ question: question });
  card.set({ answer: answer});
  card.set({ difficulty: difficulty});
  card.set({ tags: tags});

  card.save();
}

// Testing the destruction of a single card
function destroyCard(card_id) {
  var card = new Card({ id: card_id} );

  card.destroy();
}