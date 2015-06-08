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

            console.log('util.setup');

            this.template.setup();
        },
        /**
         * Template Engine Wrapper and Alias
         *
         */
        template: {
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
            build: function (templateName, data) {
                return Handlebars.templates[templateName](data);
            }
        },
        /**
         * PC and SP Event Handler
         *
         */
        bundle: {
            on: function () {

            },
            off: function () {

            }
        }
    };
    
    return util;
});