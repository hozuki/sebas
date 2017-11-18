import * as ajv from "ajv";

interface SingleValidationResult {

    valid: boolean;
    errors: ajv.ErrorObject[];

}

export default SingleValidationResult;
