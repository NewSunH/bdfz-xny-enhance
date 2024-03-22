// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.2
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

    var isCaptureMode = true;
    var lastTouchEnd = 0;
    var touchCount = 1;

    //切换至 no capture 模式
    function removeCaptureAttribute() {
        // 获取所有 input 元素
        var inputs = document.querySelectorAll('div.paizhao-btn>input');

        // 遍历所有 input 元素
        inputs.forEach(function(input) {
            // 检查是否具有 "capture" 属性
            if (input.hasAttribute('capture')) {
                // 移除 "capture" 属性
                input.removeAttribute('capture');
                //input.setAttribute('accept', 'image/*');
            }
        });
    }
    
    //切换至capture模式
    function addCaptureAttribute(){
        var inputs = document.querySelectorAll('input');

	inputs.forEach(function(input) {
	input.setAttribute('capture','camera');
	});
    }

    // 切换模式的函数
    function toggleCaptureMode() {
        if (isCaptureMode) {
            // 当前是捕获模式，切换回上传模式
            isCaptureMode = false;
        } else {
            // 当前是上传模式，切换到捕获模式
            isCaptureMode = true;
        }
    }
    
    function loadCaptureMode() {
	if(isCaptureMode) {
	    removeCaptureAttribute();
	} else {
	    addCaptureAttribute();
	}
    }

    // 在页面加载和 DOM 变化时
    document.addEventListener('DOMContentLoaded', loadCaptureMode);
    var observer = new MutationObserver(loadCaptureMode);
    observer.observe(document.body, { childList: true, subtree: true });

    // 监听三指单击事件
    document.addEventListener('touchend', function(event) {
        var now = Date.now();
        if(now - lastTouchEnd <= 5) {
               touchCount ++;
	if(touchCount === 3) {
        	toggleCaptureMode();
	}
        } else {
	     touchCount = 1;
        }
        lastTouchEnd = now; 
    });

};

