var CardTemplate = require('views/templates/card/show');

module.exports = CardView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-sm-6 col-xs-12',
  template: CardTemplate,

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
    Backbone.history.navigate('/cards/' + this.model.attributes._id, {
      trigger: true
    });
  }
});
