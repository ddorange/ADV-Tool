define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone'),
        PreviewView = require('stage/vPreview');


    // private
    var _currentIndex = 0; // 現在表示しているmodelのインデックス

     /**
     * WordView Class
     *
     */
    var StageEditView = Backbone.View.extend({

        el: '#js-stage',

        $bg: null,
        $still: null,
        $camera: null,
        $effect: null,

        v: {},

        events: {
            'change .js-select': 'onChangeSelect'
        },

        initialize: function() {
            this.$bg     = this.$el.find('#js-stage-bg');
            this.$still  = this.$el.find('#js-stage-still');
            this.$camera = this.$el.find('#js-stage-camera');
            this.$effect = this.$el.find('#js-stage-effect');
            this._checkDisplay();

            this.v.preview = new PreviewView({collection: this.collection});

            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'reset',  this.addAll);
            this.listenTo(this.collection, 'remove', this.removeOne);
        },
        render: function (model) {
            _currentIndex = this.collection.indexOf(model);
            
            this.$bg.val(model.get('bg'));
            this.$still.val(model.get('still'));
            this.$camera.val(model.get('camera'));
            this.$effect.val(model.get('effect'));

            this._checkDisplay();

            this.v.preview.render(model);

            return this;
        },
        addAll: function () {
            this.render(this.collection.last());
        },
        removeOne: function () {
            var model = this.collection.last();

            if (model) {
                this.render(model);
            }
            this._checkDisplay();
        },
        /**
         * form要素のハンドリング
         */
        onChangeSelect: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val(),
                cModel = this.collection.at(_currentIndex);

            console.log(key, val);
            cModel.set(key, val);
        },
        /**
         * collectionに要素が一つもないときは表示しない
         */
        _checkDisplay: function () {
            if (this.collection.length < 1) {
                this.$el.addClass('hide');
            } else {
                this.$el.removeClass('hide');
            }
        }
    });

    return StageEditView;

});