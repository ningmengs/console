/**
 * @author xiaojue
 * @date 20161028
 */

var Elements = {
    refresh() {

    },
    createDomTree(wrap) {
        var arr = this._recursionNode(document, []);
        wrap.innerHTML = arr.join('');
        this._bindEvent(wrap);
        this._eachOmit(wrap.querySelectorAll('.-c-omit'));
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
            this._eachOmit(target.querySelectorAll('.-c-omit'));
        }
    },
    _eachOmit(eles){
        eles.forEach((ele)=>{
            var nextTag = ele.nextSibling;
            while(nextTag === null){
               if(nextTag.nodeType === 1) break;
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
    _bindEvent(wrap) {
        wrap.addEventListener('click', this._toggleDiv.bind(this));
    },
    _unbindEvent(wrap) {
        wrap.removeEventListener('click', this._toggleDiv.bind(this));
    },
    _recursionNode(node, ret) {
        var marginL = 0,step = 10;
        if (node.childNodes.length) {
            if(node.tagName) ret.push('<span class="-c-omit" style="display:none;">...</span>');
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
                    Object.keys(item.attributes).forEach((name) => {
                        var attr = item.attributes[name];
                        attributes += '<span class="key">'+attr.name + '</span>="<span class="val">' + attr.textContent + '</span>" ';
                    });
                    ret.push('<div style="display:' + isShow + ';margin-left:'+marginL+'px;">&lt;' + tagName + ' ' +attributes + '&gt;');
                    this._recursionNode(node.childNodes[i], ret);
                    ret.push('&lt;/' + tagName + '&gt;</div>');
                }
            }
        }
        return ret;
    }
};

export default Elements;
