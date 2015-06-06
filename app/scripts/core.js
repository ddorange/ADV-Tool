/**
 * @name model.js
 * @author ddorange
 * @overview App Router
 */
define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Handlebars = require('handlebars');

    var $doc = $(document);

    var core = {
        setup: function () {

            // templateを全てコンパイル
            // TODO: ビルド時にプリコンパイル
            Handlebars.templates = {};
            
            _.each($doc.find('[data-template-name]'), function (_el) {
                var _$el = $(_el),
                    name = _$el.attr('data-template-name'),
                    source = _$el.html();

                Handlebars.templates[name] = Handlebars.compile(source);
            });

            // 
            Backbone.sync = function (method, model, options) {
                console.log(method, model, options);
            };
        }
    };

    return core;

});