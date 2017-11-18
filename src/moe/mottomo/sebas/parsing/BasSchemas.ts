import * as _RefParser from "json-schema-ref-parser";
import BasValidator from "./BasValidator";
import * as _av from "./schemas/objects/av.json";
import * as _bangumi from "./schemas/objects/bangumi.json";
import * as _seek from "./schemas/objects/seek.json";
import * as _number from "./schemas/primitives/number.json";
import * as _non_negative_integer from "./schemas/primitives/numbers/non_negative_integer.json";
import * as _positive_integer from "./schemas/primitives/numbers/positive_integer.json";
import * as _percentage from "./schemas/primitives/percentage.json";
import * as _string from "./schemas/primitives/string.json";
import * as _time from "./schemas/primitives/time.json";

const schemas: Schemas = Object.create(null);

abstract class BasSchemas {

    static get time(): tv4.JsonSchema {
        return schemas.time;
    }

    static get string(): tv4.JsonSchema {
        return schemas.string;
    }

    static get number(): tv4.JsonSchema {
        return schemas.number;
    }

    static get positiveInteger(): tv4.JsonSchema {
        return schemas.positiveInteger;
    }

    static get nonNegativeInteger(): tv4.JsonSchema {
        return schemas.nonNegativeInteger;
    }

    static get percentage(): tv4.JsonSchema {
        return schemas.percentage;
    }

    static get av(): tv4.JsonSchema {
        return schemas.av;
    }

    static get bangumi(): tv4.JsonSchema {
        return schemas.bangumi;
    }

    static get seek(): tv4.JsonSchema {
        return schemas.seek;
    }

}

const asyncExternalResolveEnabled = false;

async function resolve(deref: boolean): Promise<void> {
    if (asyncExternalResolveEnabled && deref) {
        const RefParser = _RefParser as any as RefParser;

        schemas.number = await RefParser.dereference(_number);
        schemas.string = await RefParser.dereference(_string);
        schemas.time = await RefParser.dereference(_time);
        schemas.percentage = await RefParser.dereference(_percentage);

        schemas.positiveInteger = await RefParser.dereference(_positive_integer);
        schemas.nonNegativeInteger = await RefParser.dereference(_non_negative_integer);

        schemas.av = await RefParser.dereference(_av);
        schemas.bangumi = await RefParser.dereference(_bangumi);
        schemas.seek = await RefParser.dereference(_seek);
    } else {
        schemas.number = _number;
        schemas.string = _string;
        schemas.time = _time;
        schemas.percentage = _percentage;

        schemas.positiveInteger = _positive_integer;
        schemas.nonNegativeInteger = _non_negative_integer;

        schemas.av = _av;
        schemas.bangumi = _bangumi;
        schemas.seek = _seek;
    }
}

resolve((typeof global === "object") && !!global).then((): void => {
    console.info("Schemas resolved.");

    const predefinedSchemas = [
        BasSchemas.number,
        BasSchemas.string,
        BasSchemas.time,
        BasSchemas.percentage,
        BasSchemas.positiveInteger,
        BasSchemas.nonNegativeInteger
    ];

    for (const s of predefinedSchemas) {
        BasValidator.ajv.addSchema(s);
    }
});

interface RefParser {

    dereference(schema: tv4.JsonSchema, cb: (newSchema: tv4.JsonSchema) => void);

    dereference(schema: tv4.JsonSchema): Promise<tv4.JsonSchema>;

}

interface Schemas {

    number: tv4.JsonSchema;
    string: tv4.JsonSchema;
    time: tv4.JsonSchema;
    percentage: tv4.JsonSchema;

    positiveInteger: tv4.JsonSchema;
    nonNegativeInteger: tv4.JsonSchema;

    av: tv4.JsonSchema;
    bangumi: tv4.JsonSchema;
    seek: tv4.JsonSchema;

}

export default BasSchemas;
