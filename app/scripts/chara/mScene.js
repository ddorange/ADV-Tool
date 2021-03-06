define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var CharaSceneModel = Backbone.Model.extend({
        defaults: function () {
            return  {
                visible:    false,
                transform:  'NONE',
                position:   0,
                skin:       'NONE',
                action:     'NONE',
                balloon:    'NONE'
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
        },
        activateVisible: function () {
            var transform = this.get('transform');

            this.set('visible', true);
            if (transform === 'HIDE' || 'FADE_OUT') {
                this.set('transform', 'NONE');
            }
        },
        deactivateVisible: function () {
            var transform = this.get('transform');

            this.set('visible', false);
            if (transform === 'SHOW' || 'FADE_IN') {
                this.set('transform', 'NONE');
            }
        }
    });

    return CharaSceneModel;

});