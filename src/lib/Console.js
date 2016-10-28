/**
 * @author xiaojue
 * @date 20161028
 */

var Console = {
    fixConsole() {
        this.consoleMethods.forEach((method) => {
            var original = window.console[method];
            window.console[method] = (...args) => {
                if (this.pushLog) this.pushLog(args);
                original.apply(console, args);
            };
        });
    }
};

export default Console;
