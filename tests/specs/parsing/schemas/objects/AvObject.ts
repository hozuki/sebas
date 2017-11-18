import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("AvObject", () => {

        it("should validate normal av object", () => {
            const av = {
                av: {
                    type: "number",
                    value: 10000
                },
                page: {
                    type: "number",
                    value: 2
                },
                time: {
                    type: "time",
                    value: 120
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, true);
        });

        it("should be permissive on optional \"page\" field", () => {
            const av = {
                av: {
                    type: "number",
                    value: 10000
                },
                time: {
                    type: "time",
                    value: 120
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, true);
        });

        it("should be permissive on optional \"time\" field", () => {
            const av = {
                av: {
                    type: "number",
                    value: 10000
                },
                page: {
                    type: "number",
                    value: 2
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on compulsory \"av\" field", () => {
            const av = {
                page: {
                    type: "number",
                    value: 1
                },
                time: {
                    type: "time",
                    value: 3
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on any extra field", () => {
            const av = {
                av: {
                    type: "number",
                    value: 10000
                },
                page: {
                    type: "number",
                    value: 1
                },
                time: {
                    type: "time",
                    value: 3
                },
                someExtraField: "here!"
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on field type mismatch", () => {
            const av = {
                av: "10000",
                page: {
                    type: "number",
                    value: 1
                },
                time: {
                    type: "time",
                    value: 3
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw when a field is out of range", () => {
            const av = {
                av: {
                    type: "number",
                    value: 0
                },
                page: {
                    type: "number",
                    value: 1
                },
                time: {
                    type: "time",
                    value: 3
                }
            };

            const actual = BasValidator.detailedValidate(av, BasSchemas.av);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
