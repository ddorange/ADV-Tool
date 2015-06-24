define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    /**
     * Word Preview View Class
     * @overviews: Sub View of WordView
     */
    var PreviewWordView = Backbone.View.extend({

        el: '#js-preview-word',
        
        $label: null,
        $text: null,

        initialize: function() {
            this.$label = this.$el.find('#js-preview-word-label');
            this.$text  = this.$el.find('#js-preview-word-text');
            
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'change', this.render);
        },
        render: function (model) {
            this.$label.attr('data-type', model.get('type'));
            this.$label.html(model.get('name'));
            this.$text.html(model.get('text'));
            return this;
        },
        /**
         * プレビューをクリアする
         */
        empty: function () {
            this.$label.attr('data-type', 'NONE');
            this.$label.html('');
            this.$text.html('');
            return this;
        },
        /**
         * 最新のシーンをプレビューする
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            } else {
                this.empty();
            }
        }
    });
    return PreviewWordView;

});