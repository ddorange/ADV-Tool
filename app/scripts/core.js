define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var core = {
        setup: function (data) {

            console.log('core.setup');

            // サーバーからHTMLに渡されたデータを拾う
            this.data = this.convert(data);

            // 一旦sync止める
            // TODO: localStrageに保存
            Backbone.sync = function (method, model, options) {
                console.log(method, model, options);
            };
        },
        getData: function () {
            return this.data;
        },
        getCharacterProfile: function (profileId) {
            var testData = [
                {
                    name:  'キャラクター１',
                    base:  [ 'base', ],
                    blink: [ 'blink' ],
                    skin:  [ 'angry', 'embarrassed', 'sad', 'smile' ]
                },
                {
                    name:  'キャラクター２',
                    base:  [ 'base', 'base_custom_1',  'base_custom_2', 'base_plain' ],
                    blink: [ 'blink' ],
                    skin:  [ 'angry', 'embarrassed', 'sad', 'smile', 'custom_1', 'custom_2', 'custom_3' ]
                }
            ];

            return testData[profileId - 1];
        },
        /**
         * サーバーから取得したデータを汎用的な形式に変更する
         * @memo: サーバーの仕様変更が難しいため 
         */
        convert: function (data) {
            return data || {
                character: {
                    character1: [],
                    character2: []
                },
                stage: [],
                word: []
            };
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