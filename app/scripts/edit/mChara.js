define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var SceneCharaModel = Backbone.Model.extend({
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


    var SceneModel = Backbone.Model.extend({
        defaults: function () {
            return {
                stage: new SceneStageModel(),
                word:  new SceneWordModel()
            };
        },
        setChara: function (charas) {
            var self = this;

            _.each(charas, function (chara) {
                self.set('chara_' + chara.profleId, new SceneCharaModel());
            });
        }
    });

    var SceneCollection = Backbone.Collection.extend({
        model: SceneModel
    });

    return SceneCharaModel;

});