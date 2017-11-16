export default class ApplicationError implements Error {

    constructor(message: string = null) {
        this._message = message;
    }

    get name(): string {
        return "ApplicationError";
    }

    get message(): string {
        return this._message;
    }

    get stack(): string {
        if (!this._stack) {
            this._stack = Error().stack;
        }
        return this._stack;
    }

    private _message?: string;
    private _stack?: string;

}