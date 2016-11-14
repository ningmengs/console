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
__$styleInject("/**\n * @fileoverview  console style\n */\n\n.-c-switch{\n    display: block;\n    position: fixed;\n    right: 10px;\n    bottom: 10px;\n    z-index: 2147483647;\n    border-radius: 4px;\n    box-shadow: 0 0 8px rgba( 0, 0, 0, .4);\n    padding: 8px 16px;\n    line-height: 1;\n    font-size: 14px;\n    color: #fff;\n    background-color: #04be02;\n}\n\n.-c-content,.-c-eles{\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 40px;\n    z-index: 2147483647;\n    border-top: 1px solid #eee;\n    overflow-x: hidden;\n    overflow-y: auto;\n    max-height: 50%;\n    background-color: #fff;\n    -webkit-overflow-scrolling: touch;\n    border-top:1px solid #d9d9d9;\n    opacity:0.5;\n}\n\n.-c-log{\n    margin: 0;\n    border-bottom: 1px solid #eee;\n    padding: 6px 8px;\n    overflow: hidden;\n    line-height: 1.3;\n    word-break: break-word;\n}\n\n.-c-toolbar,.-c-tab{\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    height:40px;\n    z-index: 2147483647;\n    line-height: 40px;\n    background-color: #fff;\n    opacity:0.5;\n}\n\n.-c-tab{\n    top:0px;\n}\n\n.-c-tool{\n    position: relative;\n    float: left;\n    width: 50%;\n    text-align: center;\n    text-decoration: none;\n    color: #000;\n}\n\n.-c-clear::before,.-c-console::before,.-c-refresh::before{\n    content: \"\";\n    position: absolute;\n    top: 7px;\n    bottom: 7px;\n    right: 0;\n    border-left: 1px solid #d9d9d9;\n}\n\n.-c-current{\n    color:#04be02;\n}\n\n.-c-eles div{\n    font-size:12px;\n    color:#990884;\n    margin:5px;\n}\n.-c-eles span{\n    color:#444;\n}\n.-c-eles span.val{\n    color:#1f6b7a;\n}\n.-c-eles span.key{\n    color:#900b09;\n}\n.-c-eles .-c-omit{\n    display:none;\n}\n",undefined);

var html = "<div id=\"__console\">\n    <div class=\"-c-switch\">Console</div>\n    <div class=\"-c-content\"></div>\n    <div class=\"-c-eles\"></div>\n    <div class=\"-c-toolbar -c-consoleBar\">\n        <div class=\"-c-tool -c-clear\">Clear</div>\n        <div class=\"-c-tool -c-hide\">Hide</div>\n    </div>\n    <div class=\"-c-toolbar -c-eleBar\">\n        <div class=\"-c-tool -c-refresh\">Refresh</div>\n        <div class=\"-c-tool -c-hide\">Hide</div>\n    </div>\n    <div class=\"-c-tab\">\n        <div class=\"-c-tool -c-console -c-current\">Console</div>\n        <div class=\"-c-tool -c-elements\">Elemenets</div>\n    </div>\n</div>\n";

/**
 * @author xiaojue
 * @date 20161028
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

/**
 * @author xiaojue
 * @date 20161028
 */
var domUtils = (function (eventsMap$$1) {
    function domUtils() {
        eventsMap$$1.call(this);
    }

    if ( eventsMap$$1 ) domUtils.__proto__ = eventsMap$$1;
    domUtils.prototype = Object.create( eventsMap$$1 && eventsMap$$1.prototype );
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
    domUtils.prototype.html = function html (eles, html) {
        this._put(html, 0, eles);
    };
    domUtils.prototype.text = function text (eles, text) {
        this._put(text, 1, eles);
    };
    domUtils.prototype.addClass = function addClass (clsName) {
        var eles = [], len = arguments.length - 1;
        while ( len-- > 0 ) eles[ len ] = arguments[ len + 1 ];

        eles.forEach(function (ele) {
            ele.classList.add(clsName);
        });
        return this;
    };
    domUtils.prototype.removeClass = function removeClass (clsName) {
        var eles = [], len = arguments.length - 1;
        while ( len-- > 0 ) eles[ len ] = arguments[ len + 1 ];

        eles.forEach(function (ele) {
            ele.classList.remove(clsName);
        });
        return this;
    };

    return domUtils;
}(eventsMap));

/**
 * @author xiaojue
 * @date 20161028
 */
var Base = (function (domUtils$$1) {
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
        domUtils$$1.call(this);
        this.init();
        return this;
    }

    if ( domUtils$$1 ) Base.__proto__ = domUtils$$1;
    Base.prototype = Object.create( domUtils$$1 && domUtils$$1.prototype );
    Base.prototype.constructor = Base;
    Base.prototype.render = function render () {};

    return Base;
}(domUtils));

/**
 * @author xiaojue
 * @date 20161028
 */

var Console = {
    fixConsole: function fixConsole() {
        var this$1 = this;

        this.consoleMethods.forEach(function (method) {
            var original = window.console[method];
            window.console[method] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                if (this$1.pushLog) { this$1.pushLog(args); }
                original.apply(console, args);
            };
        });
    }
};

/**
 * @author xiaojue
 * @date 20161028
 */

var Elements = {
    refresh: function refresh() {

    },
    createDomTree: function createDomTree(wrap) {
        var arr = this._recursionNode(document, []);
        wrap.innerHTML = arr.join('');
        this._bindEvent(wrap);
        this._eachOmit(wrap.querySelectorAll('.-c-omit'));
    },
    _toggleDiv: function _toggleDiv(e) {
        var target = e.target;
        if (target.nodeType === 1 && target.tagName.toLowerCase() === 'div') {
            for (var i = 0; i < target.childNodes.length; i++) {
                var item = target.childNodes[i];
                if (item.nodeType === 1 && item.tagName.toLowerCase() === 'div') {
                    item.style.display = item.style.display === "block" ? 'none' : 'block';
                }
            }
            //定位
            this._eachOmit(target.querySelectorAll('.-c-omit'));
        }
    },
    _eachOmit: function _eachOmit(eles){
        eles.forEach(function (ele){
            var nextTag = ele.nextSibling;
            while(nextTag === null){
               if(nextTag.nodeType === 1) { break; }
               nextTag = ele.nextSibling;  
            }
            if(nextTag){
                console.log(nextTag);
                if(nextTag.nodeType === 1 && nextTag.tagName === 'DIV'){
                    ele.style.display = nextTag.style.display === 'block' ? 'none' : 'inline';
                }else{
                    ele.style.display = 'none';
                }
            }
        });
    },
    _bindEvent: function _bindEvent(wrap) {
        wrap.addEventListener('click', this._toggleDiv.bind(this));
    },
    _unbindEvent: function _unbindEvent(wrap) {
        wrap.removeEventListener('click', this._toggleDiv.bind(this));
    },
    _recursionNode: function _recursionNode(node, ret) {
        var this$1 = this;

        var marginL = 0,step = 10;
        if (node.childNodes.length) {
            if(node.tagName) { ret.push('<span class="-c-omit" style="display:none;">...</span>'); }
            marginL += step;
            for (var i = 0; i < node.childNodes.length; i++) {
                var item = node.childNodes[i];
                if (item.nodeType === 3 && item.nodeValue.trim()  !== '') {
                    ret.push('<span>'+item.nodeValue.trim()+'</span>');
                }
                if (node.childNodes[i].nodeType === 1) {
                    var tagName = item.tagName.toLowerCase();
                    var isShow = (tagName === 'html' || tagName === 'head' || tagName === 'body') ? 'block' : 'none';
                    var attributes = '';
                    Object.keys(item.attributes).forEach(function (name) {
                        var attr = item.attributes[name];
                        attributes += '<span class="key">'+attr.name + '</span>="<span class="val">' + attr.textContent + '</span>" ';
                    });
                    ret.push('<div style="display:' + isShow + ';margin-left:'+marginL+'px;">&lt;' + tagName + ' ' +attributes + '&gt;');
                    this$1._recursionNode(node.childNodes[i], ret);
                    ret.push('&lt;/' + tagName + '&gt;</div>');
                }
            }
        }
        return ret;
    }
};

/**
 * @author xiaojue
 * @author dujia
 * @date 20161027
 */

Object.assign(Base.prototype, Console);
Object.assign(Base.prototype, Elements);

new Base({
    init: function init() {
        this.consoleMethods = ['debug', 'error', 'info', 'warn'];
        this.elesInit = false;
        this.fixConsole();
    },
    events: {
        'click .-c-switch': 'switchBtnClick',
        'click .-c-clear': 'clearClick',
        'click .-c-consoleBar .-c-hide': 'hideClick',
        'click .-c-eleBar .-c-hide': 'hideClick',
        'click .-c-elements': 'elementsClick',
        'click .-c-console': 'consoleClick'
    },
    eles: {
        elesBox: '.-c-eles',
        logBox: '.-c-content',
        consoletoolBar: '.-c-consoleBar',
        elestoolBar: '.-c-eleBar',
        switchBtn: '.-c-switch',
        tab: '.-c-tab',
        elesTab: '.-c-elements',
        consoleTab: '.-c-console'
    },
    render: function render() {
        this.el = this.createElement('div', {}, html);
        this.append(document.body, this.el);
    },
    pushLog: function pushLog(msg) {
        var log = this.createElement('div', {
            class: '-c-log'
        });
        this.text(log, JSON.stringify(msg.join(' ')).slice(1, -1));
        this.append(this.logBox, log);
    },
    switchBtnClick: function switchBtnClick() {
        this.show(this.logBox,this.elesBox, this.consoletoolBar,this.elestoolBar, this.tab).hide(this.switchBtn,this.elestoolBar);
    },
    clearClick: function clearClick() {
        this.html(this.logBox, '');
    },
    hideClick: function hideClick() {
        this.hide(this.logBox,this.elesBox, this.consoletoolBar,this.elestoolBar, this.tab).show(this.switchBtn);
        this.addClass('-c-current', this.consoleTab).removeClass('-c-current', this.elesTab);
    },
    elementsClick: function elementsClick() {
        this.hide(this.logBox, this.consoletoolBar).show(this.elesBox,this.elestoolBar);
        this.addClass('-c-current', this.elesTab).removeClass('-c-current', this.consoleTab);
        if(this.elesInit) { return; }
        this.elesInit = true;
        this.createDomTree(this.elesBox);
    },
    consoleClick: function consoleClick() {
        this.hide(this.elesBox,this.elestoolBar).show(this.logBox, this.consoletoolBar);
        this.addClass('-c-current', this.consoleTab).removeClass('-c-current', this.elesTab);
    }
});

})));
//# sourceMappingURL=console.js.map
