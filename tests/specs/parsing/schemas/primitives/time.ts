import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("time", () => {

        it("should validate normal time primitive", () => {
            const time = {
                type: "time",
                value: 1
            };

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on missing required fields", () => {
            const time = {
                value: 1
            };

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on having extra fields", () => {
            const time = {
                type: "time",
                value: 1,
                someOther: 1234
            };

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on type mismatch", () => {
            const time = 0;

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on declared tpype mismatch", () => {
            const time = {
                type: "number",
                value: 1
            };

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on field value out of range", () => {
            const time = {
                type: "time",
                value: -123
            };

            const actual = BasValidator.detailedValidate(time, BasSchemas.primitives.time);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
