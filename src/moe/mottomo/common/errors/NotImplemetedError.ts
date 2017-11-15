import ApplicationError from "./ApplicationError";

export default class NotImplementedError extends ApplicationError {

    get name() {
        return "NotImplementedError";
    }

}
