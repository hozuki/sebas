import * as assert from "assert";
import SingleValidationResult from "../../src/moe/mottomo/sebas/parsing/SingleValidationResult";

abstract class SpecHelper {

    static expectErrors(block: () => void, ...errors: Function[]): ExpectResult {
        if (!Array.isArray(errors)) {
            return {
                ok: false,
                message: "You must pass in an array of constructors for expectErrors."
            };
        }

        for (const err of errors) {
            if (!(err instanceof Function)) {
                return {
                    ok: false,
                    message: "You must pass in an array of constructors for expectErrors."
                };
            }
        }

        let passed = false;

        try {
            block();
            passed = true;
        } catch (ex) {
            let foundError = false;

            for (const err of errors) {
                if (ex instanceof err) {
                    foundError = true;
                    break;
                }
            }

            if (!foundError) {
                throw new TypeError(`Error detected but should be one of: [${errors.join(",")}]`);
            }
        }

        if (passed) {
            return {
                ok: false,
                message: "Semantic error: should throw an error."
            };
        } else {
            return {
                ok: true
            };
        }
    }

    static expectSchema(result: SingleValidationResult, valid: boolean): void {
        const ok = result.valid === valid;

        let message: string;
        if (ok) {
            message = null;
        } else {
            message = result.errors.map(err => err.message).join("\n");
        }

        assert.ok(ok, message);
    }

}

interface ExpectResult {
    ok: boolean;
    message?: string;
}

export default SpecHelper;
