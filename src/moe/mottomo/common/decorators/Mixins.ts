function Mixins(...baseCtors: Function[]): Function;
function Mixins(options: MixinOptions, ...baseCtors: Function[]): Function;
function Mixins(...args: any[]): Function {
    return (ctor: Function): void => {
        let options: MixinOptions;

        if (args.length > 0 && !(args[0] instanceof Function)) {
            options = args.shift();
        } else {
            options = {
                canOverwrite: false
            };
        }

        for (const baseCtor of args as Function[]) {
            const propNames = Object.getOwnPropertyNames(baseCtor.prototype);
            for (const propName of propNames) {
                // Avoid re-assigning overridden/assigned members.
                if (!Object.prototype.hasOwnProperty.call(ctor.prototype, propName) || options.canOverwrite) {
                    ctor.prototype[propName] = baseCtor.prototype[propName];
                }
            }
        }
    };
}

interface MixinOptions {

    canOverwrite: boolean;

}

export default Mixins;
