define(function (require, exports, module) {

    'use strict';

    var StageCollection = require('stage/c'),
        EditView        = require('stage/vEdit'),
        PreviewView     = require('stage/vPreview');

    /**
     * Chara Contoroller Class
     */
    var controller = function () {
        this.init.apply(this, arguments);
    };
    controller.prototype = {
        
        c: null,
        v: {},

        init: function(data) {
            this.c = new StageCollection();
            this.v.edit = new EditView({
                el: '#js-edit-stage',
                collection: this.c
            });
            this.v.preview = new PreviewView({
                el: '#js-preview'
            });

            this.c.reset(data);
        },
        showScene: function (index) {
            this.v.edit.render(index);
            this.v.preview.model = this.c.get(index);
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