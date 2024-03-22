// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.0
// @description  Remove the "capture" attribute from all input elements on xnykc, including dynamically loaded content
// @author       Shaoyu
// @match        *://bdfz.xnykcxt.com:5002/*
// @grant        none
// @license      GPL-3
// @downloadURL  https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.user.js
// @updateURL    https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // 移除 capture 属性的函数
    function removeCaptureAttribute() {
        // 获取所有 input 元素
        var inputs = document.querySelectorAll('input');

        // 遍历所有 input 元素
        inputs.forEach(function(input) {
            // 检查是否具有 "capture" 属性
            if (input.hasAttribute('capture')) {
                // 移除 "capture" 属性
                input.removeAttribute('capture');
            }
        });
    }

    // 在页面加载和 DOM 变化时调用移除 capture 属性的函数
    document.addEventListener('DOMContentLoaded', removeCaptureAttribute);
    var observer = new MutationObserver(removeCaptureAttribute);
    observer.observe(document.body, { childList: true, subtree: true });
})();
