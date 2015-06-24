define(function (require, exports, module) {

    'use strict';

    var core = require('core/index'),
        util = require('util'),
        Backbone = require('backbone');


    // private
    var _currentIndex = 0; // 現在表示しているmodelのインデックス

     /**
     * Chara Edit View Class
     */
    var CharaSceneEditView = Backbone.View.extend({

        tagName:  'li',
        templateName: 'tp_editChara',

        v: {},

        events: {
            'change .js-select': 'onChangeSelect',
        },

        initialize: function() {
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this._checkDisplay();
        },
        render: function (model) {
            var charaProfileDate = core.getCharacterProfile(model.get('profileId')), // キャラのSkin画像を取得する
                data = _.extend(charaProfileDate, model.attributes);

            _currentIndex = this.collection.indexOf(model);
            this.$el.html(util.template.build(this.templateName, data));
            
            this._checkDisplay();

            return this;
        },
        /**
         * 最新のシーンを表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            }
            this._checkDisplay();
        },
        /**
         * form要素のハンドリング
         */
        onChangeSelect: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val();

            if (key === 'transform') {
                this.collection.models[_currentIndex].setTransform(val);
            } else {
                this.collection.models[_currentIndex].set(key, val);
            }
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

    return CharaSceneEditView;
});