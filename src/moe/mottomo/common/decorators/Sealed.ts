function Sealed(): (obj: object, propertyKey: string, propertyDescriptor: PropertyDescriptor) => void;
function Sealed(ctor: Function): void;
function Sealed(ctor?: Function): void | Function {
    if (ctor && typeof(ctor) === "function") {
        Object.seal(ctor);
        Object.seal(ctor.prototype);
    } else {
        return (obj: object, propKey: string, propDesc: PropertyDescriptor): void => {
            Object.freeze(obj);
            Object.seal(obj[propKey]);
        };
    }
}

export default Sealed;
