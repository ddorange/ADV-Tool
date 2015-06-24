define(function (require, exports, module) {

    'use strict';

    var core        = require('core/index'),
        PreviewView = require('stage/vPreview');

     /**
     * Stage Edit View Class
     */
    var StageEditView = core.View.ListPresentationView.extend({

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
            this.preview = new PreviewView({ collection: this.collection });
            
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

    return StageEditView;
});