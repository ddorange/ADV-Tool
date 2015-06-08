define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    var MStage = Backbone.Model.extend({
        defaults: function () {
            return  {
                camera: 'CENTER',
                bg: null,
                effect: null,
                still: null,
            };
        }
    });

    var CStage = Backbone.Collection.extend({ model: MStage });

    return CStage;

});