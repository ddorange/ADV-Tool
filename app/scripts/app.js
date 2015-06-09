define(function (require, exports, module) {

    'use strict';

    var core       = require('core');
    var IndexView  = require('index/v');

    var StageModel = Backbone.Model;
    var StageView  = Backbone.View;

    var WordView  = require('word/v');
    var WordModel = require('word/m');


    var app = _.extend({

        m: {},
        c: {
            chara: {},
            charaScene: {},
            stage: null,
            word: null
        },
        v: {},

        sceneNum: 0,
        currentIndex: 0,
        
        setup: function () {
            // データの読み込み
            // TODO: setup前の値が入る
            var data = core.getData() || {};


            // Collectionの初期化
            this.c.scene = new Backbone.Collection();
            // this.c.chara = new CharaController(data.stage.characters);
            this.c.stage = new Backbone.Collection();
            this.c.word  = new Backbone.Collection();

            // Viewの初期化
            this.v.idnex = new IndexView({
                collection: this.c.scene
            });
            this.stage = new StageView({
                el: '#js-stage',
                collection: this.c.stage
            });
            this.v.word = new WordView({
                collection: this.c.word
            });

            // indexViewはコントローラーとViewを分離しているのでイベントをハンドリング
            this.listenTo(this.v.idnex, 'ADD_SCENE',    this.addScene);
            this.listenTo(this.v.idnex, 'REMOVE_SCENE', this.removeScene);
            this.listenTo(this.v.idnex, 'SELECT_SCENE', this.showScene);
        },
        /**
         *
         */
        showScene: function (index) {
            var scene = this.c.scene.at(index);

            console.log(scene.attributes);
            // this.v.stage.render(this.c.word.get(scene.get('stage')));
            this.v.word.render(this.c.word.get(scene.get('word')));
        },
        /**
         *
         */
        addScene: function (index) {
            console.log('addScene:' + index);

            var scene = this.createScene();

            this.c.stage.add(scene.word);
            this.c.word.add(scene.word);
            this.c.scene.add({
                stage: scene.word.cid,
                word: scene.word.cid
            }, { at: index });
            
            console.log(this.c.scene);
        },
        /**
         *
         */
        removeScene: function (index) {
            console.log('removeScene:' + index);
            
            var m = this.c.scene.models[index];

            if (m) {
                this.c.stage.remove(m.get('stage'));
                this.c.word.remove(m.get('word'));
                this.c.scene.remove(m);
            }
        },
        /**
         *
         */
        createScene: function (stage, word) {
            var self = this;

            // キャラクターシーンのModelを登録
            // this.c.chara.each(function (model) {
            //     var key = model.get('profileId') + '_' + model.get('base'),
            //         charaScene = new CharaSceneModel();

            //     self.c.charaScene[key] = charaScene;
            //     scene[key] = charaScene.cid;
            // });

            return {
                stage: new StageModel(stage),
                word: new WordModel(word)
            };
        },
        publishScene: function () {
            var self = this,
                data = [];
            
            this.c.scene.each(function (model) {
                data.push(self.c.word.get(model.get('word')).attributes);
            });

            return JSON.stringify(data);
        }

    }, Backbone.Events);

    window.app = app;

    return  app;

});