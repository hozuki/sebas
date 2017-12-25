const register = (() => {
    const globals = [];

    ((g) => {
        if (typeof(window) === "object" && window) {
            g.push(window);
        }
        if (typeof(global) === "object" && global) {
            g.push(global);
        }
        if (typeof(self) === "object" && self) {
            g.push(self);
        }
    })(globals);

    /**
     * @param value {*}
     * @param names {string | string[]}
     */
    function register(value, ...names) {
        for (const g of globals) {
            for (const name of names) {
                g[name] = value;
            }
        }
    }

    register.globals = globals;

    return register;
})();

if (typeof(module) === "object" && module) {
    module.exports = register;
}
