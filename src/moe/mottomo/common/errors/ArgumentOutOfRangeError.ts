import ApplicationError from "./ApplicationError";

export default class ArgumentOutOfRangeError extends ApplicationError {

    constructor(message: string = null, paramName: string = null) {
        super(message);
        this._paramName = paramName;
    }

    get paramName(): string {
        return this._paramName;
    }

    get name() {
        return "ArgumentOutOfRangeError";
    }

    private _paramName: string;

}
