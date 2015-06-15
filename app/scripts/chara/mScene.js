define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var CharaSceneModel = Backbone.Model.extend({
        defaults: function () {
            return  {
                visible:    false,
                transform:  null,
                position:   0,
                skin:       null,
                action:     null,
                balloon:    null
            };
        },
        setTransform: function (type) {
            this.set('transform', type, { silent: true });
            switch (type) {
                case 'SHOW':
                    this.set('visible', true);
                    break;
                case 'HIDE':
                    this.set('visible', false);
                    break;
                case 'FADE_IN':
                    this.set('visible', true);
                    break;
                case 'FADE_OUT':
                    this.set('visible', false);
                    break;
                case 'APPROACH':
                    this.set('visible', true);
                    break;
                case 'DISAPPROACH':
                    this.set('visible', true);
                    break;
            }
        }
    });

    return CharaSceneModel;

});