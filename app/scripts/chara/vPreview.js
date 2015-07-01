define(function (require, exports, module) {

    'use strict';

    var core = require('core/index'),
        util = require('util');

   /**
     * Character Preview View Class
     */
    var Preview = core.View.ListPresentationView.extend({
        
        tagName:  'div',
        className: 'character absolute',
        templateName: 'tp_previewChara',
        
        $charaImg: null,
        $baloon: null,

        initialize: function() {
            this.$el.html(util.template.build(this.templateName));
            this.$charaImg = this.$el.find('.js-character-img');
            this.$baloon = this.$el.find('.js-balloon');

            this.bindEvent();
        },
        
        bindEvent: function () {
            this.listenTo(this.collection, 'change', this.render);
            this.listenTo(this.collection, 'add',    this.render);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this.listenTo(this.collection, 'reset',  this.showLatest);
        },
        
        render: function (model) {
            var pId  = model.get('profileId'),
                skin = model.get('skin'),
                html = '';

            if (model.get('visible')) {
                this.$el.removeClass('hide');
            } else {
                this.$el.addClass('hide');
            }

            // ベース画像を設定
            html += '<img src="/img/chara/' + pId + '/' + model.get('base') + '.png">';
            
            // スキン画像を設定
            if (skin && skin !== 'NONE') {
                html += '<img src="/img/chara/' + pId + '/' + skin + '.png">';
            }

            this.$charaImg.html(html);
            this.$el.attr('style', 'transform: translate(' + model.get('position') + 'px, 0);');
            this.$el.attr('data-action', model.get('action'));
            this.$baloon.attr('data-type', model.get('balloon'));

            return this;
        },
        /**
         * 最新のシーンを表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            } else {
                this.$el.addClass('hide');
                this.$charaImg.empty();
                this.$el.attr('style', '');
                this.$el.attr('data-action', 'NONE');
                this.$baloon.attr('data-type', 'NONE');
            }
        }
    });

    return Preview;

});