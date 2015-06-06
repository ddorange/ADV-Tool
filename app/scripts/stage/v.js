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

    var VStage = Backbone.View.extend({
        
        templateName: '',

        events: {
            'change .js-select': 'onChangeSelect'
        },
        initialize: function() {
          
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

    return VStage;
});