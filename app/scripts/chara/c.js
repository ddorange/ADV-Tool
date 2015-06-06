/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var MScene = Backbone.Model.extend({
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
        transform: function (type) {
            switch (type) {
                case 'show':
                    this.set('visible', true);
                    this.set('transform', 'show');
                    break;
                case 'fadeOut':
                    this.set('visible', true);
                    this.set('transform', 'hide');
                    break;
                case 'fadeIn':
                    this.set('visible', true);
                    this.set('transform', 'show');
                    break;
                case 'fadeOut':
                    this.set('visible', true);
                    this.set('transform', 'hide');
                    break;
                case 'approach':
                    this.set('transform', 'hide');
                    break;
                case 'disapproach':
                    this.set('transform', 'hide');
                    break;
            }
        }
    });

    var CScene = Backbone.Collection.extend({
        model: MScene
    });


    var MChara = Backbone.Model.extend({
        defaults: function () {
            return {
                id: '',
                profileId: 0,
                base: 'base',
                blink: 'blink',
                scene: new CScene()
            };
        }
    });
    
    var CChara = Backbone.Collection.extend({ model: MChara });

    return CChara;

});