define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var WordModel = Backbone.Model.extend({
        defaults: function () {
            return  {
                name: '',
                type: 'NONE',
                text: '',
                transform: null
            };
        }
    });

    return WordModel;

});