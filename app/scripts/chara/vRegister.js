define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        util = require('util'),
        Backbone = require('backbone');

    /**
     * Register View class
     *
     */
    var RegisterItemView = Backbone.View.extend({
        tagName:  'li',
        className: 'list-group-item',
        templateName: 'tp_chara-register',
        events: {
            'click .js-remove': 'onRemove'
        },
        initialize: function() {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function () {
            var html = util.template.build(this.templateName, this.model.attributes);
            
            this.$el.html(html);
            return this;
        },
        onRemove: function () {
            this.model.destroy();
        }
    });

    /**
     * Register View class
     *
     * @class RegisterView
     * @overviews 登録されたキャラクターを表示するView
     */
    var RegisterView = Backbone.View.extend({
        
        el: '#js-register',

        $list: null,
        $profileId: null,
        $base: null,
        $blink: null,
        
        events: {
            'click .js-add': 'onAdd'
        },
        
        initialize: function() {
            this.$list      = this.$('#js-register');
            this.$profileId = this.$('#js-profileId');
            this.$base      = this.$('#js-base');
            this.$blink     = this.$('#js-blink');

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
        },
        addOne: function (_model) {
            var v = new RegisterItemView({model: _model});
            this.$list.append(v.render().el);
        },
        addAll: function () {
            this.collection.each(this.addOne, this);
        },
        onAdd: function() {
            var profileId = this.$profileId.val(),
                base      = this.$base.val(),
                blink     = this.$blink.val();

            this.collection.add({
                id: 'chara_' + profileId + '_' + base,
                profileId: profileId,
                base: base,
                blink: blink
            });
        }
    });

    return RegisterView;

});