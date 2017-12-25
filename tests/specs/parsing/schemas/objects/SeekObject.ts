import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("SeekObject", () => {

        it("should validate normal seek object", () => {
            const seek = {
                time: {
                    type: "time",
                    value: 1
                }
            };

            const actual = BasValidator.detailedValidate(seek, BasSchemas.objects.seek);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on compulsory \"time\" field", () => {
            const seek = {};

            const actual = BasValidator.detailedValidate(seek, BasSchemas.objects.seek);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on any extra field", () => {
            const seek = {
                time: {
                    type: "time",
                    value: 1
                },
                extra: {prop: "value"}
            };

            const actual = BasValidator.detailedValidate(seek, BasSchemas.objects.seek);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on field type mismatch", () => {
            const seek = {
                time: [{
                    type: "time",
                    value: 3
                }]
            };

            const actual = BasValidator.detailedValidate(seek, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw when a field is out of range", () => {
            const seek = {
                time: {
                    type: "time",
                    value: -5
                }
            };

            const actual = BasValidator.detailedValidate(seek, BasSchemas.objects.seek);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
