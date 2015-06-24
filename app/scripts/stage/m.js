define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var StageModel = Backbone.Model.extend({
        defaults: function () {
            return  {
                camera: 0,
                bg: null,
                effect: null,
                still: null,
            };
        }
    });

    return StageModel;

});