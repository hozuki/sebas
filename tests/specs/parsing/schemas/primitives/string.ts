import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("string", () => {

        it("should validate normal string primitive", () => {
            const string = {
                type: "string",
                value: "abc"
            };

            const actual = BasValidator.detailedValidate(string, BasSchemas.string);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on missing required fields", () => {
            const string = {
                value: "abc"
            };

            const actual = BasValidator.detailedValidate(string, BasSchemas.string);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on having extra fields", () => {
            const string = {
                type: "string",
                value: "abc",
                someOther: 1234
            };

            const actual = BasValidator.detailedValidate(string, BasSchemas.string);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on type mismatch", () => {
            const string = "string";

            const actual = BasValidator.detailedValidate(string, BasSchemas.string);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on declared tpype mismatch", () => {
            const string = {
                type: "type-A",
                value: "abc"
            };

            const actual = BasValidator.detailedValidate(string, BasSchemas.string);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
