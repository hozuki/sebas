import * as ajv from "ajv";

interface SingleValidationResult {

    readonly valid: boolean;
    readonly errors: ajv.ErrorObject[];

}

export default SingleValidationResult;
