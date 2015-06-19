/**
 * @name controller.js
 * @author ddorange
 * @overview controller of chara
 */
define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone      = require('backbone'),
        RegisterModel = require('chara/mRegister'),
        RegisterView  = require('chara/vRegister'),
        SceneModel    = require('chara/mScene'),
        EditView      = require('chara/vEdit'),
        PreviewView   = require('chara/vPreview');

    var RegisterCollection = Backbone.Collection.extend({ model: RegisterModel }),
        SceneCollection = Backbone.Collection.extend({ model: SceneModel });


    /**
     * Chara Controller Class
     */
    var Controller = _.extend({

        c: {},
        v: {},

        $editContainer: null,
        $previewContainer: null,

        setup: function() {

            this.$editContainer = $('#js-edit-chara');
            this.$previewContainer = $('#js-preview-chara');

            this.c.register = new RegisterCollection();
            this.v.register = new RegisterView({ collection: this.c.register });

            // RegisterCollectionの追加・削除に紐付け
            this.listenTo(this.c.register, 'add', this.register);
            this.listenTo(this.c.register, 'remove', this.unregister);
        },
        /**
         * シナリオに登場するキャラクターを登録する
         * 
         */
        register: function (model) {
            var id = model.get('id');

            this.c[id] = new SceneCollection();
            this.v[id] = {
                edit:    new EditView({ collection: this.c[id] }),
                preview: new PreviewView({ collection: this.c[id] })
            };
            this.$editContainer.append(this.v[id].edit.$el);
            this.$previewContainer.append(this.v[id].preview.$el);


            // シーンの追加・削除イベントを監視する

            this.trigger('REGISTER', id);
        },
        /**
         * シナリオに登場するキャラクターの登録を解除する
         *
         */
        unregister: function (model) {
            var id = model.get('id');

            this.c[id].reset();
            this.v[id].edit.remove();
            this.v[id].preview.remove();

            delete this.c[model.get('id')];
            delete this.v[model.get('id')];

            this.trigger('UNREGISTER', id);
        },
        /**
         * 任意のキャラクターのシーンモデルを生成する
         * @params {String} id:     生成するキャラクターのID
         * @params {object} data:   生成するシーンのデータ
         * @return {Backbone.Model} 
         */
        createScene: function (id, data) {
            var model = this.c.register.find(function (m) {
                    return m.get('id') === id;
                });

            data = _.extend({
                profileId: model.get('profileId'),
                base:      model.get('base')
            }, data);

            return this.c[id].add(data);
        },
        getRegistered: function (id) {
            return this.c.register[id];
        },
        getAllRegistered: function () {
            return this.c.register;
        },
        /**
         * 任意のシーンを表示する
         * @params {Int} index: 表示するシーンのインデックス
         */
        show: function (id, cid) {
            var m = this.c[id].get(cid);

            this.v[id].edit.render(m);
            this.v[id].preview.render(m);
        }

    }, Backbone.Events);

    return Controller;


});