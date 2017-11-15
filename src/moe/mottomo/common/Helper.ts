abstract class Helper {

    static ensureNotNull(value: any): void {
        if (value === null || typeof(value) === "undefined") {
            throw new TypeError("The value must not be null or undefined.");
        }
    }

    static ensureDefined(value: any): void {
        if (typeof(value) === "undefined") {
            throw new TypeError("The value must not be undefined.");
        }
    }

}

export default Helper;
