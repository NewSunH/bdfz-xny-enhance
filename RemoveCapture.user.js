// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.3
// @description  Remove the "capture" attribute from all input elements on xnykc, including dynamically loaded content and toggle capture mode manually for mobile users
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

    function getCaptureInput() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            input.setAttribute('hasCapture', 1);
        });
    }

    function removeCaptureAttribute() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (input.hasAttribute('hasCapture')) {
                input.removeAttribute('capture');
                input.removeAttribute('accept');
            }
        });
    }

    function addCaptureAttribute() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function(input) {
            if (input.hasAttribute('hasCapture')) {
                input.setAttribute('capture', 'camera');
                input.setAttribute('accept', 'image/*');
            }
        });
    }

    function toggleCaptureMode() {
        isCaptureMode = !isCaptureMode;
        loadCaptureAttribute();
        updateButton();
    }

    function loadCaptureAttribute() {
        if (isCaptureMode) {
            addCaptureAttribute();
        } else {
            removeCaptureAttribute();
        }
    }

    function updateButton() {
        var button = document.getElementById('captureToggleButton');
        if (isCaptureMode) {
            button.textContent = '拍照';
        } else {
            button.textContent = '上传';
        }
    }

    function createToggleButton() {
        var button = document.createElement('button');
        button.id = 'captureToggleButton';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.left = '10px';
        button.style.zIndex = '9999';
        button.addEventListener('click', function() {
            toggleCaptureMode();
        });
        document.body.appendChild(button);
        updateButton();
    }

    function observePageChanges() {
        var observer = new MutationObserver(function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    getCaptureInput();
                    loadCaptureAttribute();
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', function() {
        getCaptureInput();
        loadCaptureAttribute();
        createToggleButton();
        observePageChanges();
    });

})();

