/**
 * @author xiaojue
 * @author dujia
 * @date 20161027
 */

import './css/console.css';
import html from './template/console.html';

import Base from './lib/Base.js';
import Console from './lib/Console.js';
import Elements from './lib/Elements.js';

Object.assign(Base.prototype, Console);
Object.assign(Base.prototype, Elements);

new Base({
    init() {
        this.consoleMethods = ['debug', 'error', 'info', 'log', 'warn'];
        this.fixConsole();
    },
    events: {
        'click .-c-switch': 'switchBtnClick',
        'click .-c-clear': 'clearClick',
        'click .-c-hide': 'hideClick',
        'click .-c-elements': 'elementsClick',
        'click .-c-console': 'consoleClick'
    },
    eles: {
        elesBox: '.-c-eles',
        logBox: '.-c-content',
        toolBar: '.-c-toolbar',
        switchBtn: '.-c-switch',
        tab: '.-c-tab',
        elesTab: '.-c-elements',
        consoleTab: '.-c-console'
    },
    render() {
        this.el = this.createElement('div', {}, html);
        this.append(document.body, this.el);
    },
    pushLog(msg) {
        var log = this.createElement('div', {
            class: '-c-log'
        });
        this.text(log, JSON.stringify(msg.join(' ')).slice(1, -1));
        this.append(this.logBox, log);
    },
    switchBtnClick() {
        this.show(this.logBox, this.toolBar, this.tab).hide(this.switchBtn);
    },
    clearClick() {
        this.html(this.logBox, '');
    },
    hideClick() {
        this.hide(this.logBox, this.toolBar, this.tab).show(this.switchBtn);
    },
    elementsClick() {
        this.hide(this.logBox, this.toolBar).show(this.elesBox);
        this.addClass('-c-current', this.elesTab).removeClass('-c-current', this.consoleTab);
    },
    consoleClick() {
        this.hide(this.elesBox).show(this.logBox, this.toolBar);
        this.addClass('-c-current', this.consoleTab).removeClass('-c-current', this.elesTab);
    }
});
