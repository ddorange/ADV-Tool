define(function (require, exports, module) {

    'use strict';

    var core        = require('core/index'),
        Edit,
        Preview;

     /**
     * Stage Edit View Class
     */
    Edit = core.View.ListPresentationView.extend({

        el: '#js-stage',

        $bg: null,
        $still: null,
        $camera: null,
        $effect: null,

        initialize: function() {
            this.$el.addClass('hide');
            this.$bg     = this.$el.find('#js-stage-bg');
            this.$still  = this.$el.find('#js-stage-still');
            this.$camera = this.$el.find('#js-stage-camera');
            this.$effect = this.$el.find('#js-stage-effect');
            
            // サブビューを生成する
            this.preview = new Preview({ collection: this.collection });
            
            this.bindEvent();
        },
        render: function (model) {
            this.$el.removeClass('hide');
            this.$bg.val(model.get('bg'));
            this.$still.val(model.get('still'));
            this.$camera.val(model.get('camera'));
            this.$effect.val(model.get('effect'));
            return this;
        },
        show: function (model) {
            this.constructor.__super__.show.call(this, model);
            this.preview.render(model);
        }
    });


    /**
     * Stage Preview View Class
     */
    Preview = core.View.ListPresentationView.extend({
        
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
            this.bindEvent();
        },
        bindEvent: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this.listenTo(this.collection, 'reset',  this.showLatest);
        },
        render: function (model) {
            var settleBg = function ($el, path, src) {
                    if (src　&& src !=='none') {
                        $el.attr('style', 'background-image: url(' + path + src +'.jpg);');
                    } else {
                        $el.attr('style', 'none');
                    }
                };

            settleBg(this.$bg, '/img/bg/', model.get('bg'));
            settleBg(this.$still, '/img/still/', model.get('still'));
            this.$camera.attr('style', 'transform: translate(' + model.get('camera') + 'px, 0);');
            this.$effect.attr('data-type', model.get('effect'));

            return this;
        },
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            } else {
                this.$bg.attr('style', '');
                this.$still.attr('style', '');
                this.$camera.attr('style', '');
                this.$effect.attr('style', '');
            }
        }
    });


    return Edit;
});