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

var eventsMap = function eventsMap() {
    this.delegateEventSplitter = /^(\S+)\s*(.*)$/;
    if (this.events) { this._bindEventMap(); }
};
eventsMap.prototype.isFunction = function isFunction (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
};
eventsMap.prototype.$ = function $ (selector) {
    return document.querySelector(selector);
};
eventsMap.prototype._bindEventMap = function _bindEventMap () {
        var this$1 = this;

    for (var key in this.events) {
        if (this$1.events.hasOwnProperty(key)) {
            var method = this$1.events[key];
            if (!this$1.isFunction(method)) {
                method = this$1[method];
            }
            if (!method) {
                continue;
            }
            var match = key.match(this$1.delegateEventSplitter),
                type = match[1],
                selector = match[2];
            this$1.$(selector).addEventListener(type, method.bind(this$1));
        }
    }
};

var domUtils = (function (eventsMap) {
    function domUtils() {
        eventsMap.call(this);
    }

    if ( eventsMap ) domUtils.__proto__ = eventsMap;
    domUtils.prototype = Object.create( eventsMap && eventsMap.prototype );
    domUtils.prototype.constructor = domUtils;
    domUtils.prototype.createElement = function createElement (tag, attrs, content) {
        var el = document.createElement(tag),
            i;
        for (i in attrs) {
            if (attrs.hasOwnProperty(i)) {
                el.setAttribute(i, attrs[i]);
            }
        }
        if (content) {
            this.html(el, content);
        }
        return el;
    };
    domUtils.prototype.show = function show () {
        var eles = [], len = arguments.length;
        while ( len-- ) eles[ len ] = arguments[ len ];

        eles.forEach(function (ele) {
            ele.style.display = 'block';
        });
        return this;
    };
    domUtils.prototype.hide = function hide () {
        var eles = [], len = arguments.length;
        while ( len-- ) eles[ len ] = arguments[ len ];

        eles.forEach(function (ele) {
            ele.style.display = 'none';
        });
        return this;
    };
    domUtils.prototype.append = function append (parent) {
        var eles = [], len = arguments.length - 1;
        while ( len-- > 0 ) eles[ len ] = arguments[ len + 1 ];

        eles.forEach(function (ele) {
            parent.appendChild(ele);
        });
        return this;
    };
    domUtils.prototype._put = function _put (string, type) {
        var eles = [], len = arguments.length - 2;
        while ( len-- > 0 ) eles[ len ] = arguments[ len + 2 ];

        eles.forEach(function (ele) {
            if (type) {
                if (typeof ele.textContent === 'string') {
                    ele.textContent = string;
                } else {
                    ele.innerText = string;
                }
            } else {
                ele.innerHTML = string;
            }
        });
    };
    domUtils.prototype.html = function html$1 (eles, html$$1) {
        this._put(html$$1, 0, eles);
    };
    domUtils.prototype.text = function text (eles, text) {
        this._put(text, 1, eles);
    };

    return domUtils;
}(eventsMap));

var Base = (function (domUtils) {
    function Base(options) {
        var this$1 = this;

        Object.assign(this, options);
        this.render();
        if (this.eles) {
            for (var i in this.eles) {
                if (this$1.eles.hasOwnProperty(i)) {
                    this$1[i] = this$1.$(this$1.eles[i]);
                }
            }
        }
        domUtils.call(this);
        this.init();
        return this;
    }

    if ( domUtils ) Base.__proto__ = domUtils;
    Base.prototype = Object.create( domUtils && domUtils.prototype );
    Base.prototype.constructor = Base;
    Base.prototype.render = function render () {};

    return Base;
}(domUtils));

new Base({
    init: function() {
        this.consoleMethods = ['debug', 'error', 'info', 'log', 'warn'];
        this.fixConsole();
    },
    events: {
        'click .-c-switch': 'switchBtnClick',
        'click .-c-toolbar': 'toolBarClick'
    },
    eles: {
        logBox: '.-c-content',
        toolBar: '.-c-toolbar',
        switchBtn: '.-c-switch'
    },
    render: function() {
        this.el = this.createElement('div', {}, html);
        this.append(document.body, this.el);
    },
    fixConsole: function() {
        var this$1 = this;

        this.consoleMethods.forEach(function (method) {
            var original = window.console[method];
            window.console[method] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                this$1.pushLog(args);
                original.apply(console, args);
            };
        });
    },
    pushLog: function(msg) {
        var log = this.createElement('div', {
            class: '-c-log'
        });
        this.text(log, JSON.stringify(msg.join(' ')).slice(1, -1));
        this.append(this.logBox, log);
    },
    switchBtnClick: function() {
        this.show(this.logBox, this.toolBar).hide(this.switchBtn);
    },
    toolBarClick: function(e) {
        var target = e.target;
        if (target.classList.contains('-c-clear')) {
            this.html(this.logBox, '');
        } else if (target.classList.contains('-c-hide')) {
            this.hide(this.logBox, this.toolBar).show(this.switchBtn);
        }
    }
});

})));
