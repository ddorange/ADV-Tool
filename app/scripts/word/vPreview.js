define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    /**
     * PreviewWordView Class
     * @overviews: Sub View of WordView
     */
    var PreviewWordView = Backbone.View.extend({

        el: '#js-preview-word',
        
        $label: null,
        $text: null,

        initialize: function() {
            this.$label = this.$el.find('#js-preview-word-label');
            this.$text  = this.$el.find('#js-preview-word-text');
            this.listenTo(this.collection, 'change', this.render);
        },
        render: function (model) {
            this.$label.attr('data-type', model.get('type'));
            this.$label.html(model.get('name'));
            this.$text.html(model.get('text'));
            return this;
        }
    });

    return PreviewWordView;

});