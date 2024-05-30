// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.5
// @description  重构版！新能源课程网页版支持拍照、上传模式切换！新版本支持追加图片！TODO：cookies。特别感谢chatGPT。正在支持多平台。
// @author       Shaoyu
// @match        *://bdfz.xnykcxt.com:5002/*
// @grant        none
// @license      GPL-3
// @run-at       document-end
// @icon         https://raw.gitmirror.com/ShaoYuJun/xny-capture-remove/main/icon.png
// @downloadURL  https://raw.gitmirror.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.user.js
// @downloadURL  https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.user.js
// @updateURL    https://raw.gitmirror.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.meta.js
// @updateURL    https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Set the isCapture variable
    var isCapture = true;

    // Function to add or remove the capture attribute
    function toggleCapture() {
	//"Capture to answer" btn
        var inputs = document.querySelectorAll('.paizhao-btn input');
        inputs.forEach(function(input) {
            if (isCapture) {
                input.setAttribute('capture', 'camera');
            } else {
                input.removeAttribute('capture');
            }
        });
	//"Append an image" btn
        var inputs = document.querySelectorAll('.or-box input');
        inputs.forEach(function(input) {
            if (isCapture) {
                input.setAttribute('capture', 'camera');
            } else {
                input.removeAttribute('capture');
            }
        });
    }

    // Function to update the menu item text
    function updateMenuItem() {
        var menuItem = document.querySelector('.custom-menu-item');
        if (menuItem) {
            menuItem.textContent = isCapture ? '拍照' : '上传';
        }
    }

    // Function to add the menu item
    function addMenuItem() {
        var menu = document.querySelector('.menu');
        if (menu && !document.querySelector('.custom-menu-item')) {
            var menuItem = document.createElement('div');
            menuItem.className = 'custom-menu-item';
            menuItem.textContent = isCapture ? '拍照' : '上传';
            menuItem.addEventListener('click', function() {
                isCapture = !isCapture;
                toggleCapture();
                updateMenuItem();
            });
            menu.appendChild(menuItem);
        }
    }

    // Observe changes in the document for menu loading
    /*
    var menuObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.querySelector('.menu')) { // Check if the added node contains the menu
                        addMenuItem();
                    }
                });
            }
        });
    });
    */


    // Start observing for menu loading
    /*
    menuObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    */

    // Observe changes in the document for input elements
        var inputObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                addMenuItem();
                toggleCapture();
            }
        });
    });

    // Start observing for input elements
    inputObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial toggle for input elements
    setTimeout(addMenuItem, 500);
    toggleCapture();
})();
