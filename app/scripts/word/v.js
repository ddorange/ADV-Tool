define(function (require, exports, module) {

    'use strict';

    var core        = require('core/index'),
        Edit,
        Preview;

    /**
     * Word Edit View Class
     */
    Edit = core.View.ListPresentationView.extend({
        
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
            this.preview = new Preview({ collection: this.collection });
            
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


    /**
     * Word Preview View Class
     */
    Preview = core.View.ListPresentationView.extend({
        
        el: '#js-preview-word',
        
        $label: null,
        $text: null,

        initialize: function() {
            this.$el.addClass('hide');
            this.$label = this.$el.find('#js-preview-word-label');
            this.$text  = this.$el.find('#js-preview-word-text');
            this.bindEvent();
        },
        bindEvent: function () {
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'change', this.render);
        },
        render: function (model) {
            this.$el.removeClass('hide');
            this.$label.attr('data-type', model.get('type'));
            this.$label.html(model.get('name'));
            this.$text.html(model.get('text'));
            return this;
        }
    });


    return Edit;
});