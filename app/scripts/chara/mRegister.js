define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var CharaModel = Backbone.Model.extend({
        defaults: function () {
            return {
                id: '',
                profileId: 0,
                base: 'base',
                blink: 'blink'
            };
        }
    });

    return CharaModel;

});