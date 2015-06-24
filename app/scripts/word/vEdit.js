define(function (require, exports, module) {

    'use strict';

    var core        = require('core/index'),
        PreviewView = require('word/vPreview');

    /**
     * Word Edit View Class
     */
    var WordEditView = core.View.ListPresentationView.extend({
        
        el: '#js-word',
        
        $name: null,
        $text: null,
        $transform: null,
        $customName: null,

        events: {
            'change .js-select':       'handleFrom',
            'change .js-select-label': 'handleSelectLabel',
            'input  .js-input':        'handleFrom'
        },

        initialize: function() {
            this.$el.addClass('hide');
            this.$name = this.$el.find('#js-word-name');
            this.$text = this.$el.find('#js-word-text');
            this.$transform = this.$el.find('#js-word-transform');
            this.$customName = this.$el.find('#js-word-name-custom');
            
            // サブビューを生成する
            this.preview = new PreviewView({ collection: this.collection });
            
            this.bindEvent();
        },

        render: function (model) {
            this.$el.removeClass('hide');
            this.$name.val(model.get('type'));
            this.$text.val(model.get('text'));
            this.$transform.val(model.get('transform'));
            return this;
        },

        show: function (model) {
            this.constructor.__super__.show.call(this, model);
            this.preview.render(model);
        },

        handleSelectLabel: function (e) {
            var $cTarget = $(e.currentTarget),
                type = $cTarget.val(),
                name;

            if (type === 'CUSTOM') {
                name = this.$customName.val();
            } else {
                name = $cTarget.find('[value=' + type +']').text();
            }

            this.collection.at(this._currentIndex).set({
                name: name,
                type: type
            });
        }
    });

    return WordEditView;
});