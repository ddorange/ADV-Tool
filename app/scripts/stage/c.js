/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var MStage = Backbone.Model.extend({
        defaults: function () {
            return  {
                camera: 0,
                bg: null,
                effect: null,
                still: null,
            };
        }
    });

    var CStage = Backbone.Collection.extend({ model: MStage });

    return CStage;

});