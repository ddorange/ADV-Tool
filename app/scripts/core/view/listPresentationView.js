/**
 * @class:          ListPresentationView
 * @discription:    
 */
define(function (require, exports, module) {

    'use strict';

    var Backbone = require('backbone');


    var ListPresentationView = Backbone.View.extend({

        _currentIndex: 0, // 現在のmodelのインデックス

        vSub: {},

        events: {
            'change .js-select': 'handleFrom',
            'input  .js-input':  'handleFrom'
        },

        initialize: function() {
            this.bindEvent();
        },
        render: function () {
            return this;
        },
        /**
         * 任意のモデルのシーンを表示する
         * @params {Backbone.Model} model
         */
        show: function (model) {
            this._currentIndex = this.collection.indexOf(model);
            this.render(model);
            // _.each(this.vSub, function (v) {
            //     v.render(model);
            // });
        },
        /**
         * 最新のコレクションの要素を表示する
         */
        showLatest: function () {
            if (this.collection.length > 0) {
                this.render(this.collection.last());
            } else {
                this.$el.addClass('hide');
            }
        },
        /**
         * form要素のハンドリング
         */
        handleFrom: function (e) {
            var $cTarget = $(e.currentTarget),
                key = $cTarget.attr('name'),
                val  = $cTarget.val();
            
            this.collection.at(this._currentIndex).set(key, val);
        },
        /**
         * 
         */
        bindEvent: function () {
            this.listenTo(this.collection, 'add',    this.show);
            this.listenTo(this.collection, 'reset',  this.showLatest);
            this.listenTo(this.collection, 'remove', this.showLatest);
            this.listenTo(this.collection, 'change', this.show);
        },
        /**
         * サブビューを生成する
         * @params {Object} view
         */
        createSubView: function (view, params) {
            var self = this;

            _.each(view, function (View, name) {
                self.vSub[name] = new View(params);
            });
        }
    });

    return ListPresentationView;
});