/**
 * @author xiaojue
 * @date 20161028
 */

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

export default eventsMap;
