/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars');

    /**
     * Register View class
     */
    var VRegisterItem = Backbone.View.extend({
        tagName:  'li',
        className: '',
        templateName: 'tp_chara',
        events: {
            'click .js-remove': 'onRemove'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function () {
            this.$el.html(Handlebars.templates[this.templateName](this.model.attributes));
            return this;
        },
        onRemove: function () {
            console.log('remove');
            this.model.destroy();
        }
    });

    /**
     * Register View class
     *
     * @class VRegister
     * @name VRegister
     * @extends {Backbone.View}
     * @see Backbone.View
     */
    var VRegister = Backbone.View.extend({
        $list: null,
        $select: null,
        events: {
            'click .js-add': 'onAdd'
        },
        initialize: function() {
          this.$list  = this.$('.js-list');
          this.$select = this.$('.js-select');

          this.listenTo(this.collection, 'add', this.addOne);
          this.listenTo(this.collection, 'reset', this.addAll);
        },
        addOne: function (_model) {
            var v = new VRegisterItem({model: _model});
            this.$list.append(v.render().el);
        },
        addAll: function () {
            this.collection.each(this.addOne, this);
        },
        onAdd: function() {
            var profileId = this.$select.val();

            this.collection.add({
                profileId: profileId
            });
        }
    });

    return VRegister;
});