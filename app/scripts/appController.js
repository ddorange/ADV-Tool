/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        CharaController = require('chara/index');
        // StageController = require('stage/index'),
        // WordController  = require('word/index');


    var AppView = Backbone.View.extend({
        
        el: '#app',
        $sceneIndexList: null,

        currentIndex: 0,

        controller: {},

        events: {
            'click .js-selectScene': 'onSelect',
            'click #js-addScene': 'onAdd',
            'click #js-removeScene': 'onRemove'
        },
        
        initialize: function () {
            this.controller.chara = new CharaController();
            // this.controller.stage = new StageController();
            // this.controller.word  = new WordController();

            this.$sceneIndexList = $('js-sceneIndexList');
        },
        /**
         * 任意のシーンを表示する
         */
        showScene: function (index) {
            console.log(index);
            // _.each(this.controller, function (c) {
            //     c.show(index);
            // });
        },
        /**
         * シーンを追加する
         */
        onAdd: function () {
            var self = this;

            console.log('onAdd');
            // _.each(this.controller, function (c) {
            //     c.add(self.currentIndex);
            // });
        },
        /**
         * シーンを削除する
         */
        onRemove: function () {
            var self = this;
            
            console.log('onRemove');
            // _.each(this.controller, function (c) {
            //     c.remove(self.currentIndex);
            // });
        },
        onSelect: function (e) {
            var index = $(e.currentTarget).attr('data-index');
            
            this.showScene( parseInt(index, 10) );
        },
        /**
         * シーンデータを読み込む
         */
        load: function (data) {

        },
        /**
         * シーンデータを保存する
         */
        save: function () {

        }
    });

    return AppView;

});