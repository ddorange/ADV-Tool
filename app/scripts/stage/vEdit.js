/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var VEdit = Backbone.View.extend({

        $bg: null,
        $still: null,
        $camera: null,
        $effect: null,

        events: {
            'change .js-select': 'onChangeSelect'
        },
        initialize: function() {
            console.log('Stage.VEdit');
        },
        onChangeSelect: function (e) {
            var name = e.currentTarget.name,
                val  = e.currentTarget.value;
            
            console.log(name, val);
        }
    });

    return VEdit;
});