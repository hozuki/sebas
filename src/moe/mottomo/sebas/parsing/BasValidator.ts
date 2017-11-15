import * as tv4 from "tv4";
import Helper from "../../common/Helper";

abstract class BasValidator {

    static validate(object: any, schema: tv4.JsonSchema, banUnknownProperties: boolean = true): boolean {
        Helper.ensureNotNull(object);
        const result = tv4.validate(object, schema, true, banUnknownProperties);
        return result;
    }

    static detailedValidate(object: any, schema: tv4.JsonSchema, banUnknownProperties: boolean = true): SingleValidateResult {
        Helper.ensureNotNull(object);
        const result = tv4.validateResult(object, schema, true, banUnknownProperties);
        return {
            valid: !result.error,
            error: result.error
        };
    }

}

interface SingleValidateResult {

    valid: boolean;
    error: tv4.ValidationError;

}

export default BasValidator;
