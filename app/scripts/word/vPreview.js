define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    // const
    var LABEL = {
        NONE:    'preview-word_none',
        USER:    'preview-word_user',
        CHARA:   'preview-word_chara',
        UNKNOEN: 'preview-word_chara',
        CUSTOM:  'preview-word_custom'
    };

    /**
     * PreviewWordView Class
     * @overviews: Sub View of WordView
     */
    var PreviewWordView = Backbone.View.extend({

        el: '#js-preview-word',
        
        $label: null,
        $text: null,

        curentLabelStyle: '',

        initialize: function() {
            this.$label = this.$el.find('#js-preview-word-label');
            this.$text  = this.$el.find('#js-preview-word-text');

            this.$label.addClass(LABEL.NONE);
            this.curentLabelStyle = LABEL.NONE;

            this.listenTo(this.collection, 'change', this.render);
        },
        render: function (model) {
            this.$label.removeClass(this.curentLabelStyle);
            this.$label.addClass(LABEL[model.get('type')]);
            this.$label.html(model.get('name'));
            this.$text.html(model.get('text'));

            return this;
        }
    });

    return PreviewWordView;

});