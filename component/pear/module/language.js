layui.define(['jquery'], function (exports) {
    "use strict";

    /**
     * 常用封装类
     * */
    var MOD_NAME = 'lang',
        $ = layui.jquery;
    var defultLanguage = 'zh-CN';
    var lang = new function () {
        this.render = function () {
            var optionEle = $("#i18n_pagename");
            if (optionEle.length < 1) {
                console.log("未找到页面名称元素，请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
                return false;
            };
            var sourceName = optionEle.attr('content');
            sourceName = sourceName.split('-');
            // /*
            //     首先获取用户浏览器设备之前选择过的语言类型
            // */
            // if (getCookie("userLanguage")) {
            //     i18nLanguage = getCookie("userLanguage");
            // } else {
            //     // 获取浏览器语言
            //     var navLanguage = getNavLanguage();
            //     if (navLanguage) {
            //         // 判断是否在网站支持语言数组里
            //         var charSize = $.inArray(navLanguage, webLanguage);
            //         if (charSize > -1) {
            //             i18nLanguage = navLanguage;
            //             // 存到缓存中
            //             getCookie("userLanguage", navLanguage);
            //         };
            //     } else {
            //         console.log("not navigator");
            //         return false;
            //     }
            // }
            /* 需要引入 i18n 文件*/
            if ($.i18n == undefined) {
                console.log("请引入i18n js 文件")
                return false;
            };

            /*
            这里需要进行i18n的翻译
             */
            $.i18n.properties({
                name: sourceName, //资源文件名称
                path: '/component/i18n/' + defultLanguage + '/', //资源文件路径
                mode: 'map', //用Map的方式使用资源文件中的值
                language: defultLanguage,
                callback: function () {//加载成功后设置显示内容

                    $('[data-i18n-placeholder]').each(function () {
                        $(this).attr('placeholder', $.i18n.prop($(this).data('i18n-placeholder')));
                    });
                    $('[data-i18n-text]').each(function () {
                        //如果text里面还有html需要过滤掉
                        var html = $(this).html();

                        var reg = /<(.*)>/;
                        if (reg.test(html)) {
                            var htmlValue = reg.exec(html)[0];
                            $(this).html(htmlValue + $.i18n.prop($(this).data('i18n-text')));
                        }
                        else {
                            $(this).text($.i18n.prop($(this).data('i18n-text')));
                        }
                    });
                    $('[data-i18n-lay-text]').each(function () {
                        $(this).attr('lay-text', $.i18n.prop($(this).data('i18n-lay-text')));
                    });
                    $('[data-i18n-lay-reqtext]').each(function () {
                        $(this).attr('lay-reqtext', $.i18n.prop($(this).data('i18n-lay-reqtext')));
                    });

                    $('[data-i18n-value]').each(function () {
                        $(this).val($.i18n.prop($(this).data('i18n-value')));
                    });
                    $('[data-i18n-title]').each(function () {
                        $(this).attr('title', $.i18n.prop($(this).data('i18n-title')));
                    });
                }
            });
        };
    }

    exports(MOD_NAME, lang);
});
