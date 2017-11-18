import numbers from "./numbers";
import percentage from "./percentage";
import string from "./string";
import time from "./time";

export default () => {
    describe("Primitives", () => {
        numbers();
        percentage();
        string();
        time();
    });
};
