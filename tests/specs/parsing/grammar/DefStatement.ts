import * as assert from "assert";
import * as parser from "../../../../src/moe/mottomo/sebas/parsing/grammar/bas_parser";

export default () => {
    describe("\"def\" Statement", () => {
        describe("DefSubPropObject", () => {
            it("should parse a property object used in \"def\" properties", () => {
                const text = `av {  // 规则(Web) //www.bilibili.com/video/av10000/index_1.html?t=150
                av   = 10000  // 必填属性, 视频 av 号
                page = 1      // 可选属性, 分P数，默认是1, 表示第一P
                time = 2m30s // 可选属性, 打开视频后立即跳到该视频的进度, 默认是零
            }`;
                const actual = parser.parse(text, {startRule: "DefSubPropObject"});
                const expected = {
                    type: "av",
                    properties: [
                        {name: "av", value: {type: "number", value: 10000}},
                        {name: "page", value: {type: "number", value: 1}},
                        {name: "time", value: {type: "time", value: 150}}
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("DefStatement", () => {
            it("should parse \"def\" statement", () => {
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
                const actual = parser.parse(text, {startRule: "DefStatement"});
                const expected = {
                    name: "b",
                    type: "button",
                    properties: [
                        {name: "text", value: {type: "string", value: "av10000"}},
                        {name: "x", value: {type: "number", value: 100}},
                        {name: "y", value: {type: "number", value: 50}},
                        {name: "fontSize", value: {type: "number", value: 25}},
                        {name: "textColor", value: {type: "number", value: 0x000000}},
                        {name: "fillColor", value: {type: "number", value: 0xffffff}},
                        {name: "fillAlpha", value: {type: "number", value: 0.8}},
                        {name: "duration", value: {type: "time", value: 2}},
                        {
                            name: "target", value: {
                            type: "av",
                            properties: [
                                {name: "av", value: {type: "number", value: 10000}},
                                {name: "page", value: {type: "number", value: 1}},
                                {name: "time", value: {type: "time", value: 150}}
                            ]
                        }
                        }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });
    });
};
