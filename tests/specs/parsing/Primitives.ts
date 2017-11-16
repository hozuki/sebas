import * as assert from "assert";
import * as parser from "../../../src/moe/mottomo/sebas/parsing/grammar/bas_parser";

describe("Parsing", () => {
    describe("Primitives", () => {
        describe("Integer", () => {
            it("should support dec integer", () => {
                const text = "120";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": 120
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support positive dec integer", () => {
                const text = "+120";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": +120
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support negative dec integer", () => {
                const text = "-120";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": -120
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support hex integer", () => {
                const text = "0xffffff";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": 0xffffff
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support positive hex integer", () => {
                const text = "+0xffffff";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": +0xffffff
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support negative hex integer", () => {
                const text = "-0xffffff";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": -0xffffff
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("String", () => {
            it("should support string literal", () => {
                const text = "\"abcd\"";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "string",
                    "value": "abcd"
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support string literal with escape: double quotes", () => {
                const text = "\"a\\\"bcd\"";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "string",
                    "value": "a\"bcd"
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support string literal with escape: new line", () => {
                const text = "\"a\\nbcd\"";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "string",
                    "value": "a\nbcd"
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("Float", () => {
            it("should support basic float", () => {
                const text = "123.45";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": 123.45
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support positive float", () => {
                const text = "+123.45";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": +123.45
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support negative float", () => {
                const text = "-123.45";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": -123.45
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support float ending with a dot", () => {
                const text = "-123.";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": -123.
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support float starting with a dot", () => {
                const text = ".45";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": .45
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support float starting with a minus sign, then a dot", () => {
                const text = "-.45";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "number",
                    "value": -.45
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("Time", () => {
            it("should support seconds", () => {
                const text = "5s";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 5
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support minutes", () => {
                const text = "2m";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 120
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support minutes with seconds", () => {
                const text = "2m5s";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 125
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support floating point numbers for seconds", () => {
                const text = "2.5s";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 2.5
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support floating point numbers for minutes", () => {
                const text = "2.5m";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 150
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should support floating point numbers for minutes and seconds", () => {
                const text = "2.5m2.5s";
                const actual = parser.parse(text, {"startRule": "PrimitiveValue"});
                const expected = {
                    "type": "time",
                    "value": 152.5
                };
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
