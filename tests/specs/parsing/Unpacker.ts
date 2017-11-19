import * as assert from "assert";
import BasHelper from "../../../src/moe/mottomo/sebas/parsing/BasHelper";
import DefObject from "../../../src/moe/mottomo/sebas/parsing/parsed/DefObject";
import SetObject from "../../../src/moe/mottomo/sebas/parsing/parsed/SetObject";

export default () => {
    describe("Unpacker", () => {

        it("should parse normal DefSubPropObject", () => {
            const text = `av {  // 规则(Web) //www.bilibili.com/video/av10000/index_1.html?t=150
                av   = 10000  // 必填属性, 视频 av 号
                page = 1      // 可选属性, 分P数，默认是1, 表示第一P
                time = 2m30s // 可选属性, 打开视频后立即跳到该视频的进度, 默认是零
            }`;

            const parsed = BasHelper.parse(text, {startRule: "DefSubPropObject"});
            const actual = BasHelper.unpack(parsed);

            const expected = {
                type: "av", value: {
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
                        value: 150
                    }
                }
            };

            assert.deepStrictEqual(actual, expected);
        });

        it("should parse nested DefSubPropObject", () => {
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
            const parsed = BasHelper.parseAs<DefObject>(text, {startRule: "DefStatement"});
            const actual = BasHelper.unpack(parsed);

            const expected = {
                type: "button", value: {
                    text: {type: "string", value: "av10000"},
                    x: {type: "number", value: 100},
                    y: {type: "number", value: 50},
                    fontSize: {type: "number", value: 25},
                    textColor: {type: "number", value: 0x000000},
                    fillColor: {type: "number", value: 0xffffff},
                    fillAlpha: {type: "number", value: 0.8},
                    duration: {type: "time", value: 2},
                    target: {
                        type: "av", value: {
                            av: {type: "number", value: 10000},
                            page: {type: "number", value: 1},
                            time: {type: "time", value: 150}
                        }
                    }
                }
            };

            assert.deepStrictEqual(actual, expected);
        });

        it("should parse normal \"set\" target in SetStatement", () => {
            const text = `set t {
                    x = 100
                    y = [100, "easeOut"]
                    alpha = 1
                } 1s, "linear"`;

            const parsed = BasHelper.parseAs<SetObject>(text, {startRule: "SetStatement"});
            const actual = BasHelper.unpack(parsed.first.target);

            const expected = {
                // anonymous type
                type: "", value: {
                    x: {type: "number", value: 100},
                    y: {
                        type: "animated", value: {
                            targetValue: {type: "number", value: 100},
                            easing: {type: "string", value: "easeOut"}
                        }
                    },
                    alpha: {type: "number", value: 1}
                }
            };

            assert.deepStrictEqual(actual, expected);
        });

    });
};
