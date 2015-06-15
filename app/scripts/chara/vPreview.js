define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone'),
        core = require('core'),
        util = require('util');

    /**
     * Chara Preview View Class
     *
     */
    var PreviewView = Backbone.View.extend({
        
        tagName:  'div',
        className: 'character absolute',
        templateName: 'tp_previewChara',

        $charaImg: null,
        $baloon: null,

        initialize: function() {
            this.$el.html(util.template.build(this.templateName));
            this.$charaImg = this.$el.find('.js-character-img');
            this.$baloon = this.$el.find('.js-balloon');

            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'remove', this.showLatest);
        },
        render: function (model) {
            var data = model.attributes;

            if (data.visible) {
                this.$el.removeClass('hide');
            } else {
                this.$el.addClass('hide');
            }

            // 画像を設定する
            var html = '<img src="/img/chara/' + data.profileId + '/' + data.base + '.png">';
            if (data.skin && data.skin !== 'none') {
                html += '<img src="/img/chara/' + data.profileId + '/' + data.skin + '.png">';
            }
            this.$charaImg.html(html);

            this.$el.attr('style', 'transform: translate(' + model.get('position') + 'px, 0);');
            this.$el.attr('data-action', model.get('action'));
            this.$baloon.attr('data-type', model.get('balloon'));

            return this;
        },
        changeVisible: function () {
            console.log('changeVisible');
        },

        /**
         * 最新のシーンを表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            }
        }
    });

    return PreviewView;

});