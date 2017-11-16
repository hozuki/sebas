const key = "#sebas_abstract";

interface AbstractFields {
    key: string;
}

type AbstractType = ((ctor: Function) => void) & AbstractFields;

function Abstract(ctor: Function): void {
    ctor[key] = true;
    ctor.prototype[key] = true;
}

(Abstract as AbstractType).key = key;

export default Abstract as AbstractType;
