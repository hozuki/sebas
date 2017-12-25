import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("percentage", () => {

        it("should validate normal percentage primitive", () => {
            const percentage = {
                type: "percentage",
                value: 100
            };

            const actual = BasValidator.detailedValidate(percentage, BasSchemas.primitives.percentage);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on missing required fields", () => {
            const percentage = {
                value: 100
            };

            const actual = BasValidator.detailedValidate(percentage, BasSchemas.primitives.percentage);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on having extra fields", () => {
            const number = {
                type: "percentage",
                value: 100,
                someOther: 1234
            };

            const actual = BasValidator.detailedValidate(number, BasSchemas.primitives.percentage);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on type mismatch", () => {
            const percentage = [];

            const actual = BasValidator.detailedValidate(percentage, BasSchemas.primitives.percentage);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on declared tpype mismatch", () => {
            const percentage = {
                type: "type-A",
                value: 100
            };

            const actual = BasValidator.detailedValidate(percentage, BasSchemas.primitives.percentage);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
