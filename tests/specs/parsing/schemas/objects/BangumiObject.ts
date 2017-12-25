import BasSchemas from "../../../../../src/moe/mottomo/sebas/parsing/BasSchemas";
import BasValidator from "../../../../../src/moe/mottomo/sebas/parsing/BasValidator";
import SpecHelper from "../../../SpecHelper";

export default () => {
    describe("BanbumiObject", () => {

        it("should validate normal bangumi object", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: 12345
                },
                episodeId: {
                    type: "number",
                    value: 2
                },
                time: {
                    type: "time",
                    value: 120
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, true);
        });

        it("should be permissive on optional \"time\" field", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: 12345
                },
                episodeId: {
                    type: "number",
                    value: 2
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, true);
        });

        it("should throw on compulsory \"seasonId\" field", () => {
            const bangumi = {
                episodeId: {
                    type: "number",
                    value: 2
                },
                time: {
                    type: "time",
                    value: 123
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on compulsory \"episodeId\" field", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: 9999
                },
                time: {
                    type: "time",
                    value: 123
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on any extra field", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: 12345
                },
                episodeId: {
                    type: "number",
                    value: 8
                },
                time: {
                    type: "time",
                    value: 90
                },
                someExtraField: "there!"
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw on field type mismatch", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: 12345
                },
                episodeId: [8],
                time: {
                    type: "time",
                    value: 3
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

        it("should throw when a field is out of range", () => {
            const bangumi = {
                seasonId: {
                    type: "number",
                    value: -12345
                },
                episodeId: {
                    type: "number",
                    value: 8
                },
                time: {
                    type: "time",
                    value: 9
                }
            };

            const actual = BasValidator.detailedValidate(bangumi, BasSchemas.objects.bangumi);
            SpecHelper.expectSchema(actual, false);
        });

    });
};
