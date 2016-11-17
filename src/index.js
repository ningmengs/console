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
        this.consoleMethods = ['debug', 'error', 'info', 'warn','log'];
        this.elesInit = false;
        this.fixConsole();
    },
    events: {
        'click .-c-switch': 'switchBtnClick',
        'click .-c-clear': 'clearClick',
        'click .-c-consoleBar .-c-hide': 'hideClick',
        'click .-c-eleBar .-c-hide': 'hideClick',
        'click .-c-elements': 'elementsClick',
        'click .-c-refresh': 'refresh',
        'click .-c-console': 'consoleClick',
        'click .-c-save': 'saveStyle',
        'click .-c-cancel':'cancel'
    },
    eles: {
        elesBox: '.-c-eles',
        logBox: '.-c-content',
        consoletoolBar: '.-c-consoleBar',
        elestoolBar: '.-c-eleBar',
        switchBtn: '.-c-switch',
        tab: '.-c-tab',
        elesTab: '.-c-elements',
        dialog:'.-c-dialog',
        consoleTab: '.-c-console'
    },
    render() {
        this.el = this.createElement('div', {id:'__console_wrap'}, html);
        this.append(document.body, this.el);
    },
    pushLog(msg) {
        var log = this.createElement('div', {
            class: '-c-log'
        });
        this.text(log, JSON.stringify(msg.join(' ')).slice(1, -1));
        this.append(this.logBox, log);
    },
    cancel(){
       this.dialog.close(); 
    },
    saveStyle(){
       this.changeStyle();
    },
    switchBtnClick() {
        this.show(this.logBox,this.elesBox, this.consoletoolBar,this.elestoolBar, this.tab).hide(this.switchBtn,this.elestoolBar);
    },
    clearClick() {
        this.html(this.logBox, '');
    },
    hideClick() {
        this.hide(this.logBox,this.elesBox, this.consoletoolBar,this.elestoolBar, this.tab).show(this.switchBtn);
        this.addClass('-c-current', this.consoleTab).removeClass('-c-current', this.elesTab);
    },
    elementsClick() {
        this.hide(this.logBox, this.consoletoolBar).show(this.elesBox,this.elestoolBar);
        this.addClass('-c-current', this.elesTab).removeClass('-c-current', this.consoleTab);
        if(this.elesInit) return;
        this.elesInit = true;
        this.createDomTree(this.elesBox);
    },
    consoleClick() {
        this.hide(this.elesBox,this.elestoolBar).show(this.logBox, this.consoletoolBar);
        this.addClass('-c-current', this.consoleTab).removeClass('-c-current', this.elesTab);
    },
    refresh(){
        this.refreshDomTree(this.elesBox);
    }
});
