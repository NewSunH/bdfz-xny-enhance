// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.1
// @description  Remove the "capture" attribute from all input elements on xnykc, including dynamically loaded content and toggle capture mode on triple tap for mobile users
// @author       Shaoyu
// @match        *://bdfz.xnykcxt.com:5002/*
// @grant        none
// @license      GPL-3
// @downloadURL  https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.user.js
// @updateURL    https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.meta.js
// ==/UserScript==

(function() {
    'use strict';

    var isCaptureMode = false;
    var originalCaptureAttributes = {}; // 保存初始的capture属性值
    var lastTouchEnd = 0;
    var touchCount = 0;
    var timeout;

    // 保存初始的capture属性值和accept属性值
    function saveOriginalAttributes() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            originalCaptureAttributes[input] = {
                capture: input.getAttribute('capture'),
                accept: input.getAttribute('accept')
            };
        });
    }

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
                input.setAttribute('accept', 'image/*');
            }
        });
    }

    // 切换捕获模式的函数
    function toggleCaptureMode() {
        if (isCaptureMode) {
            // 当前是捕获模式，切换回普通模式
            removeCaptureAttribute();
            isCaptureMode = false;
        } else {
            // 当前是普通模式，切换到捕获模式
            var inputs = document.querySelectorAll('input');

            inputs.forEach(function(input) {
                input.setAttribute('capture', 'true');
                input.setAttribute('accept', 'image/*');
            });

            isCaptureMode = true;
        }
    }

    // 恢复初始的capture属性值和accept属性值
    function restoreOriginalAttributes() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (originalCaptureAttributes[input]) {
                input.setAttribute('capture', originalCaptureAttributes[input].capture);
                input.setAttribute('accept', originalCaptureAttributes[input].accept);
            }
        });
    }

    // 在页面加载时保存初始的capture属性值和accept属性值
    document.addEventListener('DOMContentLoaded', saveOriginalAttributes);

    // 在页面加载和 DOM 变化时调用移除 capture 属性的函数
    document.addEventListener('DOMContentLoaded', removeCaptureAttribute);
    var observer = new MutationObserver(removeCaptureAttribute);
    observer.observe(document.body, { childList: true, subtree: true });

    // 监听三指单击事件
    document.addEventListener('touchend', function(event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            // 触发了三指单击事件
            touchCount++;
            clearTimeout(timeout);

            if (touchCount === 1) {
                timeout = setTimeout(function() {
                    touchCount = 0;
                    toggleCaptureMode();
                }, 500);
            } else if (touchCount === 2) {
                touchCount = 0;
                clearTimeout(timeout);
                restoreOriginalAttributes();
            }
        } else {
            touchCount = 1;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                touchCount = 0;
            }, 500);
        }
        lastTouchEnd = now;
    });

})();

