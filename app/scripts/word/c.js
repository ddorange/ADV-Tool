/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var MWord = Backbone.Model.extend({
        defaults: function () {
            return  {
                name: 'NONE',
                type: 'NONE',
                text: '',
                transform: null
            };
        }
    });

    var CWord = Backbone.Collection.extend({ model: MWord });

    return CWord;

});