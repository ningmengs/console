/**
 * @author xiaojue
 * @date 20161028
 */

var uuid = 0;

var _eventHandlers = {};

var longtimeout;


var Elements = {
    refreshDomTree(wrap) {
            var arr = this._recursionNode(document, []);
            this.removeAllListeners(wrap, 'click');
            this.removeAllListeners(wrap, 'touchstart');
            this.removeAllListeners(wrap, 'touchend');
            wrap.innerHTML = arr.join('');
            this.addListener(wrap, 'touchstart', this._touchStart.bind(this), false);
            this.addListener(wrap, 'touchend', this._touchEnd.bind(this), false);
            this.addListener(wrap, 'click', this._toggleDiv.bind(this), false);
            this._eachOmit(wrap.querySelectorAll('.-c-omit'));
        },
        createDomTree(wrap) {
            var arr = this._recursionNode(document, []);
            wrap.innerHTML = arr.join('');
            this.addListener(wrap, 'click', this._toggleDiv.bind(this), false);
            this.addListener(wrap, 'touchstart', this._touchStart.bind(this), false);
            this.addListener(wrap, 'touchend', this._touchEnd.bind(this), false);
            this._eachOmit(wrap.querySelectorAll('.-c-omit'));
        },
        changeStyle() {
            var dialog = this.dialog,
                style= '';
            try {
                style= JSON.parse(dialog.querySelector('.__console_currentStyle').value);
            } catch (e) {
                alert('rewrite style must be standard JSON object string');
                return;
            }
            var c_uuid = dialog.querySelector('.__console_currentStyle').getAttribute('data-uuid');
            var nodeTarget = document.querySelector('[console_uuid="' + c_uuid + '"]');
			var sheetText = style.sheets.join().replace(/(\}.*?\{)/g,"").replace(/(.*?\{)/g,"").replace(/(\}$)/,"");
            nodeTarget.style.cssText = style.cssText + sheetText;
			dialog.close();
			this.refresh();
        },
        longPress(e) {
            this._showStyle(e);
        },
        _touchStart(e) {
            longtimeout = setTimeout(() => {
                this.longPress(e);
            }, 800);
        },
        _touchEnd() {
            clearTimeout(longtimeout);
        },
        css(a) {
            var sheets = document.styleSheets,
                styleObj = {},
                o = [],
                i;
            a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
            for (i in sheets) {
                if (sheets.hasOwnProperty(i)) {
                    var rules = sheets[i].rules || sheets[i].cssRules;
                    for (var r in rules) {
                        if (a.matches(rules[r].selectorText)) {
                            o.push(rules[r].cssText);
                        }
                    }
                }
            }
            styleObj.sheets = o;
            //get inline style 
            var cssText = a.style.cssText;
            if (cssText) {
                styleObj.cssText = cssText;
            }
            return styleObj;
        },
        _showStyle(e) {
            var target = e.target;
            if (target.nodeType === 1 && target.tagName.toLowerCase() === 'div') {
                var c_uuid = target.getAttribute('data-uuid');
                var nodeTarget = document.querySelector('[console_uuid="' + c_uuid + '"]');
                var style = JSON.stringify(this.css(nodeTarget));
                var dialog = this.dialog;
                dialog.querySelector('.__console_currentStyle').value = style;
                dialog.querySelector('.__console_currentStyle').setAttribute('data-uuid', c_uuid);
                dialog.querySelector('.-c-elepath').innerText = target.innerText;
                dialog.querySelector('.-c-textare_pre').innerText = style;
                dialog.show();
            }
        },
        _showBorder(target) {
            var fillterTag = ['html', 'head', 'title', 'meta', 'body', 'script', 'style'];
            if (fillterTag.indexOf(target.tagName.toLocaleLowerCase()) > -1) return;
            target.style['-webkit-animation'] = 'twinkling .5s infinite ease-in-out';
            setTimeout(function() {
                target.style['-webkit-animation'] = '';
            }, 500);
            this._setTargetY(target);
        },
        _setTargetY(node) {
            var curtop = 0;
            var curtopscroll = 0;
            if (node.offsetParent) {
                do {
                    curtop += node.offsetTop;
                    curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
                } while ((node = node.offsetParent));
            }
            window.scrollTop = (curtop - curtopscroll);
        },
        _toggleDiv(e) {
            var target = e.target;
            if (target.nodeType === 1 && target.tagName.toLowerCase() === 'div') {
                for (var i = 0; i < target.childNodes.length; i++) {
                    var item = target.childNodes[i];
                    if (item.nodeType === 1 && item.tagName.toLowerCase() === 'div') {
                        item.style.display = item.style.display === "block" ? 'none' : 'block';
                    }
                }
                //定位
                var c_uuid = target.getAttribute('data-uuid');
                var nodeTarget = document.querySelector('[console_uuid="' + c_uuid + '"]');
                this._showBorder(nodeTarget);
                this._eachOmit(target.querySelectorAll('.-c-omit'));
            }
        },
        _eachOmit(eles) {
            eles.forEach((ele) => {
                var nextTag = ele.nextSibling;
                while (nextTag === null) {
                    if (nextTag.nodeType === 1) break;
                    nextTag = ele.nextSibling;
                }
                if (nextTag) {
                    if (nextTag.nodeType === 1 && nextTag.tagName === 'DIV') {
                        ele.style.display = nextTag.style.display === 'block' ? 'none' : 'inline';
                    } else {
                        ele.style.display = 'none';
                    }
                }
            });
        },
        addListener(node, event, handler, capture) {
            if (!(node in _eventHandlers)) {
                _eventHandlers[node] = {};
            }
            if (!(event in _eventHandlers[node])) {
                _eventHandlers[node][event] = [];
            }
            _eventHandlers[node][event].push([handler, capture]);
            node.addEventListener(event, handler, capture);
        },
        removeAllListeners(node, event) {
            if (node in _eventHandlers) {
                var handlers = _eventHandlers[node];
                if (event in handlers) {
                    var eventHandlers = handlers[event];
                    for (var i = eventHandlers.length; i--;) {
                        var handler = eventHandlers[i];
                        node.removeEventListener(event, handler[0], handler[1]);
                    }
                }
            }
        },
        _recursionNode(node, ret) {
            var marginL = 0,
                step = 10;
            if (node.childNodes.length) {
                if (node.tagName) ret.push('<span class="-c-omit" style="display:none;">...</span>');
                marginL += step;
                for (var i = 0; i < node.childNodes.length; i++) {
                    var item = node.childNodes[i];
                    if (item.nodeType === 3 && item.nodeValue.trim() !== '') {
                        ret.push('<span>' + item.nodeValue.trim() + '</span>');
                    }
                    if (item.nodeType === 1) {
                        var tagName = item.tagName.toLowerCase();
                        if (item.id === '__console_wrap') continue;
                        var isShow = (tagName === 'html' || tagName === 'head' || tagName === 'body') ? 'block' : 'none';
                        var attributes = '';
                        item.setAttribute('console_uuid', uuid);
                        Object.keys(item.attributes).forEach((name) => {
                            var attr = item.attributes[name];
                            if (attr.name !== 'console_uuid') {
                                attributes += '<span class="key">' + attr.name + '</span>="<span class="val">' + attr.textContent + '</span>" ';
                            }
                        });
                        ret.push('<div data-uuid="' + uuid + '" style="display:' + isShow + ';margin-left:' + marginL + 'px;">&lt;' + tagName + ' ' + attributes + '&gt;');
                        uuid++;
                        this._recursionNode(item, ret);
                        ret.push('&lt;/' + tagName + '&gt;</div>');
                    }
                }
            }
            return ret;
        }
};

export default Elements;
