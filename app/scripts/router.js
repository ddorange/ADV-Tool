/**
 * @name model.js
 * @author ddorange
 * @overview App Router
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone'),
        AppController = require('appController');


    var app;

    /**
     * ADV Router class
     *
     * @class RADV
     * @name RADV
     * @extends {Backbone.Router}
     * @see Backbone.Router
     */
    var RADV = Backbone.Router.extend({
        routes: {
            /**
             * 初期化
             */
            '': function () {
                app = new AppController();
            },
            /**
             * 任意のシーンを表示する
             */
            'scene_:index': function (index) {
                app.showScene(index);
            }
        }
    });

    return RADV;

});