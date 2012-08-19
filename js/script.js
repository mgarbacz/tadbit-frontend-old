// Setting up Card Model with our RESTful API (cool feature backbone!)
var CardItem = Backbone.Model.extend({ urlRoot: 'http://localhost:8124/cards' });

// Setting up Card View
var CardView = Backbone.View.extend({
  tagName: 'div',
  class: 'card',
  template: _.template('<li><%= question %></li>' +
                       '<li><%= answer %></li>' +
                       '<li><%= difficulty %></li>' +
                       '<li><%= tags %></li>'),

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    var html = this.template(this.model.toJSON());
    $(this.el).html(html);
    console.log(this.el);
  },

  remove: function() {
    $(this.el).remove();
  }
});

// Testing the rendering of a single card
function renderCard(card_id) {
  var card = new CardItem({ id: card_id });
  var card_view = new CardView({ model: card});
  card.fetch();
}

// Testing the creation of a single card
function createCard(question, answer, difficulty, tags) {
  var card = new CardItem();
  card.set({ question: question });
  card.set({ answer: answer});
  card.set({ difficulty: difficulty});
  card.set({ tags: tags});

  card.save();
}

// Testing the destruction of a single card
function destroyCard(card_id) {
  var card = new CardItem({ id: card_id} );

  card.destroy();
}