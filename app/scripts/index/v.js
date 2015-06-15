define(function (require, exports, module) {
    'use strict';

    var $           = require('jquery'),
        util        = require('util'),
        Backbone    = require('backbone');


    var SceneIndexView = Backbone.View.extend({
        
        el: '#js-sceneIndex',
        
        $sceneIndexList: null,
        
        templateName: 'tp_sceneIndexListItem',
        
        events: {
            'click .js-selectScene':    'onSelect',
            'click #js-addScene':       'onAdd',
            'click #js-removeScene':    'onRemove'
        },
        
        initialize: function () {
            this.$sceneIndexList = $('#js-sceneIndexList');
            this.listenTo(this.collection, 'add',   this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);
            this.listenTo(this.collection, 'remove',this.addAll);
        },
        render: function () {
            var self = this,
                html = '';

            this.collection.each(function (model, index) {
                html += util.template.build(self.templateName, { index: index });
            });
            this.$sceneIndexList.html(html);
        },
        addOne: function (model) {
            this.render();
            this.toggleIndex(this.collection.indexOf(model));
        },
        addAll: function () {
            this.render();
            this.toggleIndex(this.collection.length - 1); // 最新のシーンを表示する
        },
        /**
         * 任意のシーンのタブをアクティブにする
         */
        toggleIndex: function (index) {
            $(this.$sceneIndexList.children()).removeClass('active');
            this.$sceneIndexList.find('[data-index="' + index +'"]').addClass('active');
        },
        /**
         * シーンを追加する
         */
        onAdd: function () {
            var index = this.$sceneIndexList.find('.active').attr('data-index');

            index = (index)? parseInt(index, 10) + 1: 0;
            this.trigger('ADD_SCENE', index);
        },
        /**
         * シーンを削除する
         */
        onRemove: function () {
            var index = this.$sceneIndexList.find('.active').attr('data-index');

            this.trigger('REMOVE_SCENE', index);
        },
        /**
         * 任意のシーンを選択する
         */
        onSelect: function (e) {
            var index = $(e.currentTarget).attr('data-index');

            this.toggleIndex(index);
            this.trigger('SELECT_SCENE', index);
            // Backbone.history.navigate('scene_' + index, {trigger: true});
        }
    });

    return SceneIndexView;

});