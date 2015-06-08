define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone');

    var VPreview = Backbone.View.extend({

        $bg: null,
        $still: null,
        $camera: null,
        $effect: null,

        initialize: function() {
            this.$bg     = $('js-preview-bg');
            this.$still  = $('js-preview-still');
            this.$camera = $('js-preview-camera');
            this.$effect = $('js-preview-effect');

            // this.listenTo(this.model, 'change:bg', this.onChangeBg);
        },
        onChangeBg: function () {
            var imgId= this.model.get('bg');
            this.$bg.attr('style', 'background-image: url("./img/bg"' + imgId + '.jpg);');
        }
    });

    return VPreview;
});