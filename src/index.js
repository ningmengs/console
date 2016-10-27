import './css/console.css';
import html from './template/console.html';

var createElement = function(tag, attrs, content) {
    var el = document.createElement(tag),
        i;
    for (i in attrs) {
        if (attrs.hasOwnProperty(i)) {
            el.setAttribute(i, attrs[i])
        }
    }

    if (content) {
        el.innerHTML = content
    }

    return el
}

var pushLog = function(msg) {
    var log = createElement('div', {
        class: '-c-log'
    }, JSON.stringify(msg.join(' ')).slice(1, -1))
    logBox.appendChild(log)
}

var init = function() {
    var el = createElement('div', {}, html)
    document.body.appendChild(el)
}

init()

var logBox = document.querySelector('.-c-content');
var toolBar = document.querySelector('.-c-toolbar');
var switchBtn = document.querySelector('.-c-switch');

switchBtn.addEventListener('click', function() {
    logBox.style.display = 'block'
    toolBar.style.display = 'block'
    switchBtn.style.display = 'none'
})

toolBar.addEventListener('click', function(e) {
    var target = e.target;
    if (target.classList.contains('-c-clear')) {
        logBox.innerHTML = ''
    } else if (target.classList.contains('-c-hide')) {
        logBox.style.display = 'none'
        toolBar.style.display = 'none'
        switchBtn.style.display = 'block'
    }
})

;
['debug', 'error', 'info', 'log', 'warn'].forEach(function(method) {
    var original = window.console[method]
    window.console[method] = function() {
        pushLog(Array.prototype.slice.call(arguments))
        original.apply(console, arguments);
    }
})
