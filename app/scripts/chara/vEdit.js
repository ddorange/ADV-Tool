define(function (require, exports, module) {

    'use strict';

    var core = require('core/index'),
        util = require('util');

    /**
     * Chatacter Edit View Class
     */
    var Edit = core.View.ListPresentationView.extend({
        
        tagName:  'li',
        className: 'hide',
        templateName: 'tp_editChara',
        
        events: {
            'change .js-select':    'handleFrom',
            'change .js-visible':   'handleVisible',
            'change .js-transform': 'handleTransform'
        },

        initialize: function() {
            var data = core.getCharacterProfile(this.$el.attr('data-profileId'));

            this.$el.html(util.template.build(this.templateName, data));
            
            this.$visible = this.$el.find('.js-visible');
            this.$transform = this.$el.find('.js-transform');
            this.$pos = this.$el.find('.js-position');
            this.$skin = this.$el.find('.js-skin');
            this.$action = this.$el.find('.js-action');
            this.$balloon = this.$el.find('.js-balloon');
            
            this.bindEvent();
        },

        render: function (model) {
            var bool = model.get('visible');

            this.$el.removeClass('hide');
            this.$visible.prop('checked', bool);
            this.$transform.val(model.get('transform'));
            this.$pos.val(model.get('position'));
            this.$skin.val(model.get('skin'));
            this.$action.val(model.get('action'));
            this.$balloon.val(model.get('balloon'));

            return this;
        },
        handleVisible: function () {
            if (this.$visible.prop('checked')) {
                this.collection.models[this._currentIndex].activateVisible();
            } else {
                this.collection.models[this._currentIndex].deactivateVisible();
            }
        },
        handleTransform: function () {
            this.collection.models[this._currentIndex].setTransform(this.$transform.val());
        }
    });

    return Edit;

});