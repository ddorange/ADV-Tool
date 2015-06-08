define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone        = require('backbone'),
        Handlebars = require('handlebars'),
        core            = require('core');
        // CharaController = require('chara/index'),
        // StageController = require('stage/index');
        // WordController  = require('word/index');

    var WordCollection = require('word/c');
    var WordView  = require('word/v');


    var app = {
        
        currentIndex: 0,
        c: {},
        v: {},
        
        setup: function () {
            // データの読み込み
            var data = core.data;

            // this.c.chara = new CharaController(data.stage.characters);
            // this.c.stage = new StageController();
            
            this.c.word = new WordCollection();
            this.v.word = new WordView({
                el: '#js-word',
                collection: this.c.word
            });

            this.v.app = new AppView();
        },
        showScene: function (index) {
            console.log(index);
        },
        addScene: function (index) {
            this.c.word.add({});
            this.v.word.render(this.currentIndex);
            this.currentIndex++;
        },
        removeScene: function (index) {
            index = index || this.currentIndex;
            console.log('removeScene:' + index);
        },
    };


    var AppView = Backbone.View.extend({
        
        el: '#app',
        $sceneIndexList: 0,
        templateName: 'tp_sceneIndexListItem',
        events: {
            'click .js-selectScene': 'onSelect',
            'click #js-addScene': 'onAdd',
            'click #js-removeScene': 'onRemove'
        },
        
        initialize: function () {
            this.$sceneIndexList = $('js-sceneIndexList');
        },
        addIndexListItem: function (index) {
            var html = (Handlebars.templates[this.templateName]({index: index}));
            
            this.$el.append(html);
        },
        /**
         * シーンを追加する
         */
        onAdd: function () {
            app.addScene();
            this.addIndexListItem(app.currentIndex);
        },
        /**
         * シーンを削除する
         */
        onRemove: function () {
            app.removeScene();
        },
        /**
         * シーンデータを保存する
         */
        onSave: function () {

        }
    });

    return  app;

});