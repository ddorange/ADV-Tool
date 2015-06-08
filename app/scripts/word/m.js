define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var WordModel = Backbone.Model.extend({
        defaults: function () {
            return  {
                index: 0,
                name: 'NONE',
                type: 'NONE',
                text: 'なし',
                transform: null
            };
        }
    });

    return WordModel;

});