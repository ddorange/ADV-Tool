/**
 * @name util.js
 * @author ddorange
 * @overview ライブラリのショーカット等
 */
define(function (require, exports, module) {

    'use strict';

    var $ = require('jquery'),
        Handlebars = require('handlebars');

    var $doc = $(document);

    var util = {
        setup: function () {

            // templateを全てコンパイル
            // TODO: ビルド時にプリコンパイルするように変更する
            Handlebars.templates = {};
            
            _.each($doc.find('[data-template-name]'), function (_el) {
                var _$el = $(_el),
                    name = _$el.attr('data-template-name'),
                    source = _$el.html();

                Handlebars.templates[name] = Handlebars.compile(source);
            });
        },
        template: {
            build: function (templateName, data) {
                return Handlebars.templates[templateName](data);
            }
        }
    };

    return util;

});