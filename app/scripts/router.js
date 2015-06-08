define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

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
                console.log('router: root');
            },
            /**
             * 任意のシーンを表示する
             */
            'scene_:index': function (index) {
                console.log('router: scene_' + index);
            }
        }
    });

    return RADV;

});