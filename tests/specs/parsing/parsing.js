const assert = require("assert");
const parser = require("../../../src/moe/mottomo/sebas/parsing/src/bas_parser");

describe("Parsing", () => {
    describe("Primitives", () => {
        describe("Integer", () => {
            it("should return 0xffffff", () => {
                const text = "0xffffff";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 0xffffff);
            });
        });

        describe("Time", () => {
            it("should return 120 (2m)", () => {
                const text = "2m";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 120);
            });

            it("should return 125 (2m5s)", () => {
                const text = "2m5s";
                const actual = parser.parse(text, { "startRule": "PrimitiveValue" });
                assert.strictEqual(actual, 125);
            });
        });
    });

    describe("\"def\" Statement", () => {
        describe("DefSubPropObject", () => {
            it("should parse a property object used in \"def\" properties", () => {
                const text = `av {  // 规则(Web) //www.bilibili.com/video/av10000/index_1.html?t=150
                av   = 10000  // 必填属性, 视频 av 号
                page = 1      // 可选属性, 分P数，默认是1, 表示第一P
                time = 2m30s // 可选属性, 打开视频后立即跳到该视频的进度, 默认是零
            }`;
                const actual = parser.parse(text, { "startRule": "DefSubPropObject" });
                const expected = {
                    "type": "av",
                    "properties": [
                        { "name": "av", "type": "primitive", "value": 10000 },
                        { "name": "page", "type": "primitive", "value": 1 },
                        { "name": "time", "type": "primitive", "value": 150 }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("DefObject", () => {
            it("should parse \"def\" object", () => {
                const text = `def button b { // 跳转按钮
                    text      = "av10000"
                    x         = 100
                    y         = 50
                    fontSize  = 25
                    textColor = 0x000000
                    fillColor = 0xffffff
                    fillAlpha = 0.8
                    duration  = 2s
                    target    = av {  // 规则(Web) //www.bilibili.com/video/av10000/index_1.html?t=150
                        av   = 10000  // 必填属性, 视频 av 号
                        page = 1      // 可选属性, 分P数，默认是1, 表示第一P
                        time = 2m30s // 可选属性, 打开视频后立即跳到该视频的进度, 默认是零
                    }
                }`;
                const actual = parser.parse(text, { "startRule": "DefObject" });
                const expected = {
                    "name": "b",
                    "type": "button",
                    "properties": [
                        { "name": "text", "type": "primitive", "value": "av10000" },
                        { "name": "x", "type": "primitive", "value": 100 },
                        { "name": "y", "type": "primitive", "value": 50 },
                        { "name": "fontSize", "type": "primitive", "value": 25 },
                        { "name": "textColor", "type": "primitive", "value": 0x000000 },
                        { "name": "fillColor", "type": "primitive", "value": 0xffffff },
                        { "name": "fillAlpha", "type": "primitive", "value": 0.8 },
                        { "name": "duration", "type": "primitive", "value": 2 },
                        {
                            "name": "target", "type": "object", "value": {
                                "type": "av",
                                "properties": [
                                    { "name": "av", "type": "primitive", "value": 10000 },
                                    { "name": "page", "type": "primitive", "value": 1 },
                                    { "name": "time", "type": "primitive", "value": 150 }
                                ]
                            }
                        }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });
    });

    describe("\"set\" Statement", () => {
        describe("Single", () => {
            it("should parse single \"set\" statement", () => {
                const text = `set t {
                    x = 100
                    y = [100, "easeOut"]
                    alpha = 1
                } 1s, "linear"`;
                const actual = parser.parse(text, { "startRule": "SetExpr" });
                const expected = {
                    "target": {
                        "name": "t",
                        "properties": [
                            { "name": "x", "type": "primitive", "value": 100 },
                            {
                                "name": "y", "type": "animated", "value": {
                                    "value": 100, "interpolation": "easeOut"
                                }
                            },
                            { "name": "alpha", "type": "primitive", "value": 1 }
                        ]
                    },
                    "options": {
                        "duration": 1,
                        "defaultInterpolation": "linear"
                    }
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("Serial", () => {
            it("should parse serial \"set\" array", () => {
                const text = `set a {
                    alpha = 1
                } 1s, "easeIn"
                then set a {
                    alpha = 0
                } 1s, "easeOut"`;
                const actual = parser.parse(text, { "startRule": "SerialSet" });
                const expected = {
                    "type": "serial",
                    "commands": [
                        {
                            "target": {
                                "name": "a",
                                "properties": [
                                    { "name": "alpha", "type": "primitive", "value": 1 }
                                ]
                            },
                            "options": {
                                "duration": 1,
                                "defaultInterpolation": "easeIn"
                            }
                        },
                        {
                            "target": {
                                "name": "a",
                                "properties": [
                                    { "name": "alpha", "type": "primitive", "value": 0 }
                                ]
                            },
                            "options": {
                                "duration": 1,
                                "defaultInterpolation": "easeOut"
                            }
                        }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
});
