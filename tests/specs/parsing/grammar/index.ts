import DefStatement from "./DefStatement";
import Primitives from "./Primitives";
import SetStatement from "./SetStatement";

export default () => {
    describe("Grammar", () => {
        DefStatement();
        Primitives();
        SetStatement();
    });
};
