define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var _currentIndex = 0; // 現在表示しているmodelのインデックス


    var WordView = Backbone.View.extend({

        el: '#js-word',
        
        $name: null,
        $text: null,
        $transform: null,

        events: {
            'change .js-select': 'onChangeSelect'
        },

        initialize: function() {
            this.$name = this.$el.find('#js-word-name');
            this.$text = this.$el.find('#js-word-text');
            this.$transform = this.$el.find('#js-word-transform');
            this.$customName = this.$el.find('#js-word-name-custom');
            this.checkDisplay();

            this.listenTo(this.collection, 'add',     this.render);
            this.listenTo(this.collection, 'reset',   this.addAll);
            this.listenTo(this.collection, 'remove', this.removeOne);
        },
        render: function (model) {
            _currentIndex = this.collection.indexOf(model);
            this.$name.val(model.get('type'));
            this.$text.val(model.get('text'));
            this.$transform.val(model.get('transform'));
            this.checkDisplay();

            return this;
        },
        addAll: function () {
            this.render(this.collection.last());
        },
        removeOne: function () {
            var model = this.collection.last();

            if (model) {
                this.render(model);
            }
        },
        /**
         * collectionに要素が一つもないときは表示しない
         */
        checkDisplay: function () {
            if (this.collection.length === 0) {
                this.$el.addClass('hide');
            } else {
                this.$el.removeClass('hide');
            }
        },
        /**
         * form要素のハンドリング
         */
        onChangeSelect: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val(),
                nameVal;

            if (this.collection.length < 1) {
                window.alert('シーンを挿入して下さい');
                return;
            }

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
        }
    });

    return WordView;
});