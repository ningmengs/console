/*
 * console v1.0.0
 * (c) 2016 xiaojue
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}
__$styleInject("/**\n * @fileoverview  console style\n */\n\n.-c-switch{\n    display: block;\n    position: fixed;\n    right: 10px;\n    bottom: 10px;\n    z-index: 2147483647;\n    border-radius: 4px;\n    box-shadow: 0 0 8px rgba( 0, 0, 0, .4);\n    padding: 8px 16px;\n    line-height: 1;\n    font-size: 14px;\n    color: #fff;\n    background-color: #04be02;\n}\n\n.-c-content{\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 40px;\n    z-index: 2147483647;\n    border-top: 1px solid #eee;\n    overflow-x: hidden;\n    overflow-y: auto;\n    max-height: 50%;\n    background-color: #fff;\n    -webkit-overflow-scrolling: touch;\n}\n\n.-c-log{\n    margin: 0;\n    border-bottom: 1px solid #eee;\n    padding: 6px 8px;\n    overflow: hidden;\n    line-height: 1.3;\n    word-break: break-word;\n}\n\n.-c-toolbar{\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 2147483647;\n    line-height: 40px;\n    background-color: #fff;\n}\n\n.-c-tool{\n    position: relative;\n    float: left;\n    width: 50%;\n    text-align: center;\n    text-decoration: none;\n    color: #000;\n}\n\n.-c-clear::before{\n    content: \"\";\n    position: absolute;\n    top: 7px;\n    bottom: 7px;\n    right: 0;\n    border-left: 1px solid #d9d9d9;\n}\n",undefined);

var html = "<div id=\"__console\">\n    <div class=\"-c-switch\">Console</div>\n    <div class=\"-c-content\"></div>\n    <div class=\"-c-toolbar\">\n        <div class=\"-c-tool -c-clear\">Clear</div>\n        <div class=\"-c-tool -c-hide\">Hide</div>\n    </div>\n</div>\n";

/**
 * @author xiaojue
 * @author dujia
 * @date 20161027
 */

var console = function console() {
    var this$1 = this;

    this.el = this.createElement('div', {}, html);
    document.body.appendChild(this.el);
    this.logBox = document.querySelector('.-c-content');
    this.toolBar = document.querySelector('.-c-toolbar');
    this.switchBtn = document.querySelector('.-c-switch');
    this.bindEvent();
    ['debug', 'error', 'info', 'log', 'warn'].forEach(function (method) {
        var original = window.console[method];
        window.console[method] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            this$1.pushLog(args);
            original.apply(console, args);
        };
    });
};
console.prototype.createElement = function createElement (tag, attrs, content) {
    var el = document.createElement(tag),i;
    for (i in attrs) {
        if (attrs.hasOwnProperty(i)) {
            el.setAttribute(i, attrs[i]);
        }
    }
    if (content) {
        el.innerHTML = content;
    }
    return el;
};
console.prototype.pushLog = function pushLog (msg) {
    var log = this.createElement('div', {
        class: '-c-log'
    }, JSON.stringify(msg.join(' ')).slice(1, -1));
    this.logBox.appendChild(log);
};
console.prototype.bindEvent = function bindEvent () {
        var this$1 = this;

    this.switchBtn.addEventListener('click', function () {
        this$1.logBox.style.display = 'block';
        this$1.toolBar.style.display = 'block';
        this$1.switchBtn.style.display = 'none';
    });
    this.toolBar.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('-c-clear')) {
            this$1.logBox.innerHTML = '';
        } else if (target.classList.contains('-c-hide')) {
            this$1.logBox.style.display = 'none';
            this$1.toolBar.style.display = 'none';
            this$1.switchBtn.style.display = 'block';
        }
    });
};

new console();

})));
