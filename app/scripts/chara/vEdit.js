/**
 * @name model.js
 * @author ddorange
 * @overview model of scene
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone'),
        Handlebars = require('handlebars');


    var VEditChara = Backbone.View.extend({
        tagName:  'li',
        className: '',
        templateName: 'tp_editChara',
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function () {
            this.$el.html(Handlebars.templates[this.templateName](this.model.attributes));
            return this;
        }
    });


    var VEditCharaList = Backbone.View.extend({
        events: {
            'click .js-add': 'onAdd'
        },
        initialize: function() {
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'destroy', this.destroyOne);
            this.listenTo(this.collection, 'reset', this.addAll);
        },
        addOne: function (m) {
            var v = new VEditChara({model: m});

            this.$el.append(v.render().el);
        },
        addAll: function () {
            // this.collection.each(this.addOne, this);
        },
        destroyOne: function (m) {

        }
    });

    return VEditCharaList;
});