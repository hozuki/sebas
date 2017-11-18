import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("number", () => {

        it("should validate normal number primitive", () => {
            const number = {
                type: "number",
                value: 100
            };

            const actual = BasValidator.detailedValidate(number, BasSchemas.number);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on missing required fields", () => {
            const number = {
                value: 100
            };

            const actual = BasValidator.detailedValidate(number, BasSchemas.number);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on having extra fields", () => {
            const number = {
                type: "number",
                value: 100,
                someOther: 1234
            };

            const actual = BasValidator.detailedValidate(number, BasSchemas.number);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on type mismatch", () => {
            const number = [];

            const actual = BasValidator.detailedValidate(number, BasSchemas.number);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on declared type mismatch", () => {
            const number = {
                type: "type-A",
                value: 100
            };

            const actual = BasValidator.detailedValidate(number, BasSchemas.number);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
