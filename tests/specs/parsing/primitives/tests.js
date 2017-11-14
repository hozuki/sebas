const assert = require("assert");
const parser = require("../../../../src/moe/mottomo/sebas/parsing/src/bas_parser");

describe("Parsing", () => {
    describe("Primitives", () => {
        describe("Integer", () => {
            it("should support dec integer", () => {
                const text = "120";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 120);
            });

            it("should support positive dec integer", () => {
                const text = "+120";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, +120);
            });

            it("should support negative dec integer", () => {
                const text = "-120";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, -120);
            });

            it("should support hex integer", () => {
                const text = "0xffffff";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 0xffffff);
            });

            it("should support positive hex integer", () => {
                const text = "+0xffffff";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, +0xffffff);
            });

            it("should support negative hex integer", () => {
                const text = "-0xffffff";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, -0xffffff);
            });
        });

        describe("String", () => {
            it("should support string literal", () => {
                const text = "\"abcd\"";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, "abcd");
            });

            it("should support string literal with escape: double quotes", () => {
                const text = "\"a\\\"bcd\"";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, "a\"bcd");
            });

            it("should support string literal with escape: new line", () => {
                const text = "\"a\\nbcd\"";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, "a\nbcd");
            });
        });

        describe("Float", () => {
            it("should support basic float", () => {
                const text = "123.45";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 123.45);
            });

            it("should support positive float", () => {
                const text = "+123.45";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, +123.45);
            });

            it("should support negative float", () => {
                const text = "-123.45";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, -123.45);
            });

            it("should support float ending with a dot", () => {
                const text = "-123.";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, -123.);
            });

            it("should support float starting with a dot", () => {
                const text = ".45";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, .45);
            });

            it("should support float starting with a minus sign, then a dot", () => {
                const text = "-.45";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, -.45);
            });
        });

        describe("Time", () => {
            it("should support seconds", () => {
                const text = "5s";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 5);
            });

            it("should support minutes", () => {
                const text = "2m";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 120);
            });

            it("should support minutes with seconds", () => {
                const text = "2m5s";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 125);
            });

            it("should support floating point numbers for seconds", () => {
                const text = "2.5s";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 2.5);
            });

            it("should support floating point numbers for minutes", () => {
                const text = "2.5m";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 150);
            });

            it("should support floating point numbers for minutes and seconds", () => {
                const text = "2.5m2.5s";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 152.5);
            });
        });
    });
});
