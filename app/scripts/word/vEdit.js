define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone'),
        PreviewView = require('word/vPreview');


    // private
    var _currentIndex = 0; // 現在表示しているmodelのインデックス

     /**
     * WordView Class
     *
     */
    var WordView = Backbone.View.extend({

        el: '#js-word',
        
        $name: null,
        $text: null,
        $transform: null,

        v: {},

        events: {
            'change .js-select': 'onChangeSelect',
            'input  .js-input':  'onInput'
        },

        initialize: function() {
            this.$name = this.$el.find('#js-word-name');
            this.$text = this.$el.find('#js-word-text');
            this.$transform = this.$el.find('#js-word-transform');
            this.$customName = this.$el.find('#js-word-name-custom');
            this.v.preview = new PreviewView({collection: this.collection});
            this._checkDisplay();

            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'remove', this.showLatest);
        },
        render: function (model) {
            _currentIndex = this.collection.indexOf(model);
            this.$name.val(model.get('type'));
            this.$text.val(model.get('text'));
            this.$transform.val(model.get('transform'));
            this._checkDisplay();

            return this;
        },
        show: function (model) {
            this.render(model);
            this.v.preview.render(model);
        },
        showLatest: function () {
            var model = this.collection.last();

            if (model) {
                this.show(model);
            }
            this._checkDisplay();
        },
        /**
         * form要素のハンドリング
         */
        onChangeSelect: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val(),
                nameVal;

            console.log(key, val);

            // ラベル変更の際は、名前も一緒に取得する
            if (key === 'type') {
                if (val === 'CUSTOM') {
                    nameVal = this.$customName.val();
                } else {
                    nameVal = $cTarget.find('[value=' + val +']').text();
                }
                this.collection.models[_currentIndex].set('name', nameVal);
            }

            this.collection.models[_currentIndex].set(key, val);
        },
        onInput: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val();

            this.collection.models[_currentIndex].set(key, val);
        },
        /**
         * collectionに要素が一つもないときは表示しない
         */
        _checkDisplay: function () {
            if (this.collection.length < 1) {
                this.$el.addClass('hide');
            } else {
                this.$el.removeClass('hide');
            }
        }
    });

    return WordView;
});