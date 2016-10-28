/**
 * @author xiaojue
 * @date 20161028
 */
import eventsMap from './eventsMap.js';

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
    addClass(clsName, ...eles) {
        eles.forEach((ele) => {
            ele.classList.add(clsName);
        });
        return this;
    }
    removeClass(clsName, ...eles) {
        eles.forEach((ele) => {
            ele.classList.remove(clsName);
        });
        return this;
    }
}

export default domUtils;

