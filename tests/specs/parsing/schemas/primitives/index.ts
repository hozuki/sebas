import number from "./number";
import numbers from "./numbers";
import percentage from "./percentage";
import string from "./string";
import time from "./time";

export default () => {
    describe("Primitives", () => {
        number();
        numbers();
        percentage();
        string();
        time();
    });
};
