define(function (require, exports, module) {

    'use strict';

    var CharaCollection  = require('chara/c'),
        RegisterListView = require('chara/vRegister'),
        EditListView     = require('chara/vEdit');

    /**
     * Chara Contoroller Class
     */
    var controller = function () {
        this.init.apply(this, arguments);
    };
    controller.prototype = {
        
        c: null,
        v: {},

        init: function() {
            this.c = new CharaCollection();

            this.v.register = new RegisterListView({
                el: '#js-register',
                collection: this.c
            });

            this.v.edit = new EditListView({
                el: '#js-edit-charaList',
                collection: this.c
            });
        },
        getCurrentAllCharactersInfo: function (name) {
            var obj = {};

            this.c.each(function (m) {
                obj[m.get('profileId')] = m.get(name);
            });

            return obj;
        },
        showScene: function (index) {
            this.v.edit.showScene(index);
        },
        addScene: function (index) {
            this.c.each(function (m) {
                m.get('scene').add({});
            });
        },
        removeScene: function (index) {

        }
    };

    return controller;
});