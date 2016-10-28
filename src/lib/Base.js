/**
 * @author xiaojue
 * @date 20161028
 */
import domUtils from './domUtils.js';

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

export default Base;
