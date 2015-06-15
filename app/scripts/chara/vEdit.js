define(function (require, exports, module) {

    'use strict';

    var core = require('core'),
        util = require('util'),
        Backbone = require('backbone'),
        PreviewView = require('chara/vPreview');


    // private
    var _currentIndex = 0; // 現在表示しているmodelのインデックス

     /**
     * WordView Class
     *
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
        },
        render: function (model) {
            var charaProfileDate = core.getCharacterProfile(), // キャラのSkin画像を取得する
                data = _.extend(charaProfileDate, model.attributes);

            _currentIndex = this.collection.indexOf(model);
            this.$el.html(util.template.build(this.templateName, data));
            return this;
        },
        /**
         * 最新のシーンを表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            }
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

            console.log(key, val);
        }
    });

    return CharaSceneEditView;
});