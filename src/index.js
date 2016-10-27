/**
 * @author xiaojue
 * @author dujia
 * @date 20161027
 */

import './css/console.css';
import html from './template/console.html';

class eventsMap {
    constructor() {
        this.delegateEventSplitter = /^(\S+)\s*(.*)$/;
        if (this.events) this._bindEventMap();
    }
    isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }
    $(selector) {
        return document.querySelector(selector);
    }
    _bindEventMap() {
        for (var key in this.events) {
            if (this.events.hasOwnProperty(key)) {
                var method = this.events[key];
                if (!this.isFunction(method)) {
                    method = this[method];
                }
                if (!method) {
                    continue;
                }
                var match = key.match(this.delegateEventSplitter),
                    type = match[1],
                    selector = match[2];
                this.$(selector).addEventListener(type, method.bind(this));
            }
        }
    }
}

class domUtils extends eventsMap {
    constructor() {
        super();
    }
    createElement(tag, attrs, content) {
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
    }
    show(...eles) {
        eles.forEach((ele) => {
            ele.style.display = 'block';
        });
        return this;
    }
    hide(...eles) {
        eles.forEach((ele) => {
            ele.style.display = 'none';
        });
        return this;
    }
    append(parent, ...eles) {
        eles.forEach((ele) => {
            parent.appendChild(ele);
        });
        return this;
    }
    _put(string, type, ...eles) {
        eles.forEach((ele) => {
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
    }
    html(eles, html) {
        this._put(html, 0, eles);
    }
    text(eles, text) {
        this._put(text, 1, eles);
    }
}

class Base extends domUtils {
    constructor(options) {
        Object.assign(this, options);
        this.render();
        if (this.eles) {
            for (var i in this.eles) {
                if (this.eles.hasOwnProperty(i)) {
                    this[i] = this.$(this.eles[i]);
                }
            }
        }
        super();
        this.init();
        return this;
    }
    render() {}
}

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
        this.consoleMethods.forEach((method) => {
            var original = window.console[method];
            window.console[method] = (...args) => {
                this.pushLog(args);
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
