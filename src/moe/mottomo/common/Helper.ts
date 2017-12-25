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

    static removeAt<T>(array: T[], index: number): T | null {
        Helper.ensureNotNull(array);
        Helper.ensure(Array.isArray(array));
        Helper.ensure(typeof(index) === "number");

        if (index < 0 || index >= array.length) {
            return array.splice(index, 1)[0];
        } else {
            return null;
        }
    }

}

export default Helper;
