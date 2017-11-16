function Sealed(): (obj: object, propertyKey: string, propertyDescriptor: PropertyDescriptor) => void;
function Sealed(ctor: Function): void;
function Sealed(ctor?: Function): void | Function {
    // I can't implement semantics like "sealed" in C# and "final" in Java...
    if (ctor && typeof(ctor) === "function") {
        console.info(`Class should be sealed: ${ctor}`);
    } else {
        return (proto: Function, propKey: string, propDesc: PropertyDescriptor): void => {
            console.info(`Method should be sealed: ${propKey}@${proto}`);
        };
    }
}

export default Sealed;
