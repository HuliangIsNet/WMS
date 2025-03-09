layui.define(['jquery', 'layer', 'echarts'], function (exports) {
    "use strict";
    let $ = layui.jquery,
        layer = layui.layer;
    var MOD_NAME = 'barcode';
    var option = {
        listenerObj: null,
        letter: true,
        number: true,
        check: true,

        oneKeyTime: '', /* 一次按键时间间隔 */
        twoKeyTime: '', /* 两次按键时间间隔 */
        keyDownTime: '', /* 键按下的时间    */
        barcodeLen: 8, /* 条形码长度      */
        spanTime: 70, /* 一次按键按下到释放的时间间隔 */
        zerokeyVal: 48, /* 零的key值      */
        ninekeyVal: 57, /* 数字9的key值   */
        akeyVal: 65, /* a的key值      */
        zkeyVal: 90, /* z的key值      */
        show: function (code) {

        }
    };
    var codeKey = '';
    function on_key_down() {
        $('body').keydown(function (e) {
            if (e.which !== 13 && !(in_range(e.which))) {
                clearListEl();
                return;
            }
            var d = new Date();
            var curTime = parseInt(d.getTime());
            if (option.keyDownTime !== '' && option.keyDownTime !== NaN) {
                option.twoKeyTime = curTime - option.keyDownTime;
            }
            option.keyDownTime = curTime;
        });
    };
    function on_key_up() {
        $('body').keyup(function (e) {
            var d = new Date();
            var keyUpTime = d.getTime();
            option.oneKeyTime = parseInt(keyUpTime) - parseInt(option.keyDownTime);
            var isHand = checkHandInput();
            if (isHand) {
                clearListEl();
            }
            else {
                if (!is_number(e.key))
                    codeKey += e.key;
            }
        });
    };
    function on_key_press() {
        $('body').keypress(function (e) {
            if (e.which == 13) {
                createListEl();
            }
        });
    };

    function check_barcode() {
        if (codeKey.length !== option.barcodeLen) {
            clearListEl();
            return false;
            // layer.msg('条形码不合法',{time : 800});
        } else {
            return true;
        }
    };
    function checkHandInput() {
        if ((option.oneKeyTime > option.spanTime)) {
            return true;
        } else {
            return false;
        }
    };
    function checkInput() {
        if ($(option.listenerObj).focus()) {
            return true;
        } else {
            return false;
        }
    };
    //判断按下的键是否在字母加数字这个范围
    function in_range(key) {

        var isLegal = false;
        if (option.number) {
            isLegal = is_number(key);
        }
        if (option.letter) {
            isLegal = is_letter(key);
        }
        if (option.number && option.letter) {
            isLegal = (is_number(key) || is_letter(key)) ? true : false;
        }
        return isLegal;
    };
    function is_number(key) {
        if (key > option.ninekeyVal || key < option.zerokeyVal) {
            return false;
        } else {
            return true;
        }
    };
    function is_letter(key) {
        if (key > option.zkeyVal || option < option.akeyVal) {
            return false;
        } else {
            return true;
        }
    };
    function check_network() {
        return (navigator.onLine) ? true : false;
    };
    function clearListEl() {
        codeKey = '';
        option.oneKeyTime = '';
        option.twoKeyTime = '';
        option.keyDownTime = '';
    }
    function createListEl() {
        if (typeof option.show == 'function') {
            option.show(codeKey);
            clearListEl();
            // layer.msg('扫描成功',{time:1000});
        } else {
            layer.msg('no callback function');
        }
        //this.listenerObj.val("").focus();
    };
    function keepFocusInput() {
        $('body').blur(function (e) {
            var that = $(this);
            setTimeout(function () {
                that.focus().select();
            }, 300);
        });
        // this.listenerObj.blur(function () {
        // 	var that = $(this);
        // 	setTimeout(function () {
        // 		that.focus().select();
        // 	}, 300);
        // });
    };

    var barcode = new function () {

        this.startListen = function (settings) {
            option = $.extend(option, settings);
            on_key_down();
            on_key_up();
            on_key_press();
            keepFocusInput();
            //$(window).focus().select();
        };
        this.endListen = function () {
            $('body').off('keydown');
            $('body').off('keyup');
            $('body').off('keypress');
        }
    };
    exports(MOD_NAME, barcode);
});