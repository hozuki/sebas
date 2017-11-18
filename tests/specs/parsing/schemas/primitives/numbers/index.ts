import non_negative_integer from "./non_negative_integer";
import positive_integer from "./positive_integer";

export default () => {
    describe("Numbers", () => {
        non_negative_integer();
        positive_integer();
    });
};
