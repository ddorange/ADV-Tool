define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var Model = Backbone.Model.extend({
        defaults: function () {
            return  {
                stage: null,
                word:  null,
            };
        }
    });

    return Model;

});