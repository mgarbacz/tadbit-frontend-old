var NewCardTemplate = require('views/templates/card/new');

module.exports = NewCardView = Backbone.View.extend({
    template: NewCardTemplate,

    events: {
        'click #add-submit': 'submit'
    },

    render: function() {
        $(this.el).html(this.template(this.model.attributes));
        return this;
    },

    submit: function(e) {
        e.preventDefault();
        console.log(this.model);
        var newQuestion = $('#input-question').val();
        var newAnswer = $('#input-answer').val();
        var newTags = $('#input-tags').val().replace(/,\s/g, ',').replace(/\s/g, '-').split(',');
        this.model.save({
            question: newQuestion,
            answer: newAnswer,
            tags: newTags
        });

        $('#add-reset').click();
    }

});
