import BasValidator from "./BasValidator";
import * as _button from "./schemas/elements/button.json";
import * as _av from "./schemas/objects/av.json";
import * as _bangumi from "./schemas/objects/bangumi.json";
import * as _seek from "./schemas/objects/seek.json";
import * as _numbers from "./schemas/primitives/numbers.json";
import * as _percentage from "./schemas/primitives/percentage.json";
import * as _string from "./schemas/primitives/string.json";
import * as _time from "./schemas/primitives/time.json";

const BasSchemas: Schemas = (function resolve(): Schemas {
    const numbers = _numbers;
    numbers.number = _numbers.definitions.number;
    numbers.positiveInteger = _numbers.definitions.positiveInteger;
    numbers.nonNegativeInteger = _numbers.definitions.nonNegativeInteger;

    return {
        primitives: {
            numbers,
            string: _string,
            time: _time,
            percentage: _percentage
        },
        objects: {
            av: _av,
            bangumi: _bangumi,
            seek: _seek
        },
        elements: {
            button: _button
        }
    };
})();

export default BasSchemas;

(function registerSchemas(predefinedSchemas: tv4.JsonSchema[]) {
    for (const s of predefinedSchemas) {
        BasValidator.ajv.addSchema(s);
    }
})([
    BasSchemas.primitives.numbers,
    BasSchemas.primitives.string,
    BasSchemas.primitives.time,
    BasSchemas.primitives.percentage
]);

interface Schemas {
    readonly primitives: PrimitivesSchemaList;
    readonly objects: ObjectsSchemaList;
    readonly elements: ElementsSchemaList;
}

interface PrimitivesSchemaList {
    readonly numbers: tv4.JsonSchema & NumbersSchemaList;
    readonly string: tv4.JsonSchema;
    readonly time: tv4.JsonSchema;
    readonly percentage: tv4.JsonSchema;
}

interface NumbersSchemaList {
    readonly number: tv4.JsonSchema;
    readonly positiveInteger: tv4.JsonSchema;
    readonly nonNegativeInteger: tv4.JsonSchema;
}

interface ObjectsSchemaList {
    readonly av: tv4.JsonSchema;
    readonly bangumi: tv4.JsonSchema;
    readonly seek: tv4.JsonSchema;
}

interface ElementsSchemaList {
    readonly button: tv4.JsonSchema;
}
