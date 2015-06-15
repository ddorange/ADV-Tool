/**
 * @name app.js
 * @author ddorange
 * @overview controller of ADV Tool
 */
define(function (require, exports, module) {

    'use strict';

    var core            = require('core'),
        
        // index ---
        IndexView       = require('index/v'),
        
        // stage ---
        StageModel      = require('stage/mScene'),
        StageCollection  = Backbone.Collection.extend({ model: StageModel }),
        StageView       = require('stage/vEdit'),
        
        // word ---
        WordModel       = require('word/mScene'),
        WordCollection  = Backbone.Collection.extend({ model: WordModel }),
        WordView        = require('word/vEdit');

    var charaController = require('chara/controller');


    var app = _.extend({

        c: {},
        v: {},

        controller: {},
        
        setup: function () {
            // Collectionの初期化
            this.c.stage = new StageCollection();
            this.c.word  = new WordCollection();
            this.c.scene = new Backbone.Collection();

            // Viewの初期化
            this.v.idnex = new IndexView({ collection: this.c.scene });
            this.v.stage = new StageView({ collection: this.c.stage });
            this.v.word  = new WordView({ collection: this.c.word });

            charaController.setup();
            this.listenTo(charaController, 'REGISTER', this.registerChara);
            this.listenTo(charaController, 'UNREGISTER', this.unregisterChara);

            // indexViewはコントローラーとViewを分離しているのでイベントをハンドリング
            this.listenTo(this.v.idnex, 'ADD_SCENE',    this.addScene);
            this.listenTo(this.v.idnex, 'REMOVE_SCENE', this.removeScene);
            this.listenTo(this.v.idnex, 'SELECT_SCENE', this.showScene);

            // 既存データの読み込み
            this.load();
        },
        /**
         * 任意のシーンを表示する
         * @params {Int} index: 表示するシーンのインデックス
         *
         */
        showScene: function (index) {
            var model = this.c.scene.at(index);

            _.each(model.attributes, function (key, cid) {
                if (key === 'stage') {
                    this.v.stage.render(this.c.stage.get(cid));
                } else if ('word') {
                    this.v.word.render(this.c.word.get(cid));
                } else {
                    charaController.show(key, cid);
                }
            });
        },
        /**
         * シーンを追加する
         * @params {Int} index: 追加するシーンのインデックス
         */
        addScene: function (index, option) {
            var scene     = {},
                opt       = option || {},
                charaData = opt.chara || {},
                stageData = opt.stage || {},
                wordData  = opt.stage || {};

            // 追加した各モデルのcidをシーンのモデルに持たせる
            _.each(charaController.getAllRegistered(), function (model) {
                var id    = model.get('id');

                scene[id] = charaController.createScene(id, charaData[id]);
            });
            scene.stage = this.c.stage.add(stageData).cid;
            scene.word  = this.c.word.add(wordData).cid;

            this.c.scene.add(scene, { at: index });
        },
        /**
         * シーンを削除する
         * @params {Int} index: 表示するシーンのインデックス
         *
         */
        removeScene: function (index) {
            console.log('removeScene:' + index);
            
            var m = this.c.scene.at(index);

            if (m) {
                this.c.stage.remove(m.get('stage'));
                this.c.word.remove(m.get('word'));
                this.c.scene.remove(m);
            }
        },
        registerChara: function (id) {
            this.c.scene.each(function (m) {
                m.set(id, charaController.createScene(id).cid);
            });
        },
        publishScene: function () {
            var self = this,
                data = [];
            
            this.c.scene.each(function (model) {
                var obj = {};
                
                _.each(model.attributes, function (cid, key) {
                    obj[key] = self.c[key].get(cid).attributes;
                });
                data.push(obj);
            });

            return data;
        },
        load: function () {
            var self = this,
                data = core.getData() || {};

            charaController.load(data.stage.chara);

            _.each(data.scene, function (obj, i) {
                self.addScene(i, obj);
            });
        }

    }, Backbone.Events);

    window.app = app;

    return  app;

});