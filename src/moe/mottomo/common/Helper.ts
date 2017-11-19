abstract class Helper {

    static ensure(value: any, message?: string): void {
        if (!value) {
            throw new Error(message);
        }
    }

    static ensureNotNull(value: any): void {
        Helper.ensure(typeof(value) !== "undefined" && value !== null, "The value must not be null or undefined.");
    }

    static ensureDefined(value: any): void {
        Helper.ensure(typeof(value) !== "undefined", "The value must not be undefined.");
    }

}

export default Helper;
