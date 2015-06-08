define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var core = {
        setup: function (data) {

            this.data = this.convert(data);

            // 一旦sync止める
            // TODO: localStrageに保存
            Backbone.sync = function (method, model, options) {
                console.log(method, model, options);
            };
        },
        /**
         * サーバーから取得したデータを汎用的な形式に変更する
         * @memo: サーバーの仕様変更が難しいため 
         */
        convert: function (data) {
            return data || { stage: { characters: [] }, scene: [] };
        },
        /**
         * サーバーに保存する用の形式に変更する
         * @memo: サーバーの仕様変更が難しいため
         */
        publsh: function (data) {
            return data;
        }
    };

    return core;

});