define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');

    // private
    var _setBg = function ($el, path, src) {
            if (src　&& src !=='none') {
                $el.attr('style', 'background-image: url(' + path + src +'.jpg);');
            } else {
                $el.attr('style', 'none');
            }
        };

    /**
     * PreviewStageView Class
     * @overviews: Sub View of WordView
     */
    var PreviewStageView = Backbone.View.extend({

        el: '#js-preview',
        
        $bg: null,
        $still: null,
        $camera: null,
        $effect: null,

        initialize: function() {
            this.$bg     = this.$el.find('#js-preview-bg');
            this.$still  = this.$el.find('#js-preview-still');
            this.$camera = this.$el.find('#js-preview-camera');
            this.$effect = this.$el.find('#js-preview-effect');

            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'remove', this.showLatest);
        },
        render: function (model) {
            var camera = model.get('camera');

            _setBg(this.$bg, '/img/bg/', model.get('bg'));
            _setBg(this.$still, '/img/still/', model.get('still'));
            this.$camera.attr('style', 'transform: translate(' + camera + 'px, 0);');
            this.$effect.attr('data-type', model.get('effect'));

            return this;
        },
        empty: function () {
            _setBg(this.$bg, '/img/bg/', 'none');
            _setBg(this.$still, '/img/still/', 'none');
            this.$camera.attr('style', '');
            this.$effect.attr('data-type', 'NONE');
            return this;
        },
        /**
         * 最新のシーンを表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            } else {
                this.empty();
            }
        }
    });

    return PreviewStageView;

});