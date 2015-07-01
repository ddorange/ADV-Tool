define(function (require, exports, module) {

    'use strict';

    var core = require('core/index'),
        util = require('util');

    /**
     * Chatacter Edit View Class
     */
    var Edit = core.View.ListPresentationView.extend({
        
        tagName:  'li',
        templateName: 'tp_editChara',
        
        events: {
            'change .js-select':            'handleFrom',
            'change .js-select-transform':  'handleSelectTransform'
        },

        render: function (model) {
            var pId = model.get('profileId'),
                data = core.getCharacterProfile(pId);

            this.$el.html(util.template.build(this.templateName, data));

            this.$el.find('#js-chara-transform').val(model.get('transform'));
            this.$el.find('#js-chara-position').val(model.get('position'));
            this.$el.find('#js-chara-skin').val(model.get('skin'));
            this.$el.find('#js-chara-action').val(model.get('action'));
            this.$el.find('#js-chara-balloon').val(model.get('balloon'));

            return this;
        },
        
        handleSelectTransform: function (e) {
            this.collection.models[this._currentIndex].setTransform($(e.currentTarget).val());
        }
    });

    return Edit;

});