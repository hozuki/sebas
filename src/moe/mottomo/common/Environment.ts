import {detect} from "detect-browser";

const browser = detect();

abstract class Environment {

    static get browserName(): string {
        if (browser) {
            return browser.name;
        } else {
            return null;
        }
    }

    static get browserVersion(): string {
        if (browser) {
            return browser.version;
        } else {
            return null;
        }
    }

    static get os(): string {
        if (browser) {
            // In Node.js: os.type().toLower()
            return browser.os;
        } else {
            return null;
        }
    }

}

export default Environment;
