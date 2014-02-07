module.exports = CardView = Backbone.View.extend({
  tagName: 'ul',
  className: 'card col-xs-6',
  template: _.template( $('#card-template').html() ),

  events: {
    'click': 'display'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    // Setting the HTML to the template filled with the model's data
    console.log(this.model.toJSON());
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function() {
    $(this.el).remove();
  },

  display: function() {
    Backbone.history.navigate('cards/' + this.model.attributes._id, {
      trigger: true
    });
  }
});
