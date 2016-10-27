/**
 * @author xiaojue
 * @author dujia
 * @date 20161027
 */

import './css/console.css';
import html from './template/console.html';

class console {
    constructor() {
        this.el = this.createElement('div', {}, html);
        document.body.appendChild(this.el);
        this.logBox = document.querySelector('.-c-content');
        this.toolBar = document.querySelector('.-c-toolbar');
        this.switchBtn = document.querySelector('.-c-switch');
        this.bindEvent();
        ['debug', 'error', 'info', 'log', 'warn'].forEach((method) => {
            var original = window.console[method];
            window.console[method] = (...args) => {
                this.pushLog(args);
                original.apply(console, args);
            };
        });
    }
    createElement(tag, attrs, content) {
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
    }
    pushLog(msg) {
        var log = this.createElement('div', {
            class: '-c-log'
        }, JSON.stringify(msg.join(' ')).slice(1, -1));
        this.logBox.appendChild(log);
    }
    bindEvent() {
        this.switchBtn.addEventListener('click', () => {
            this.logBox.style.display = 'block';
            this.toolBar.style.display = 'block';
            this.switchBtn.style.display = 'none';
        });
        this.toolBar.addEventListener('click', (e) => {
            var target = e.target;
            if (target.classList.contains('-c-clear')) {
                this.logBox.innerHTML = '';
            } else if (target.classList.contains('-c-hide')) {
                this.logBox.style.display = 'none';
                this.toolBar.style.display = 'none';
                this.switchBtn.style.display = 'block';
            }
        });
    }
}

new console();
