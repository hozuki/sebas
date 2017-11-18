import * as Ajv from "ajv";
import Helper from "../../common/Helper";
import SingleValidationResult from "./SingleValidationResult";

const ajv = new Ajv();

const cachedSchemas: Map<object, Ajv.ValidateFunction> = new Map();

abstract class BasValidator {

    static get ajv(): Ajv.Ajv {
        return ajv;
    }

    static validate(object: any, schema: tv4.JsonSchema): boolean {
        Helper.ensureNotNull(object);
        Helper.ensureNotNull(schema);

        let validator: Ajv.ValidateFunction;

        if (cachedSchemas.has(schema)) {
            validator = cachedSchemas.get(schema);
        } else {
            validator = ajv.compile(schema);
            cachedSchemas.set(schema, validator);
        }

        return !!validator(object);
    }

    static detailedValidate(object: any, schema: tv4.JsonSchema): SingleValidationResult {
        Helper.ensureNotNull(object);
        Helper.ensureNotNull(schema);

        let validator: Ajv.ValidateFunction;

        if (cachedSchemas.has(schema)) {
            validator = cachedSchemas.get(schema);
        } else {
            validator = ajv.compile(schema);
            cachedSchemas.set(schema, validator);
        }

        const valid = !!validator(object);
        const errors = valid ? [] : validator.errors;

        return {
            valid,
            errors
        };
    }

}

export default BasValidator;
