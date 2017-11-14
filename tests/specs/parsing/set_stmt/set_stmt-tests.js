const assert = require("assert");
const parser = require("../../../../src/moe/mottomo/sebas/parsing/src/bas_parser");

describe("Parsing", () => {
    describe("\"set\" Statement", () => {
        describe("Single", () => {
            it("should parse single \"set\" statement", () => {
                const text = `set t {
                    x = 100
                    y = [100, "easeOut"]
                    alpha = 1
                } 1s, "linear"`;
                const actual = parser.parse(text, { "startRule": "SetStatement" });
                const expected = {
                    "first": {
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
                    },
                    "then": null
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("Sequential", () => {
            it("should parse sequential \"set\" statement (with \"then\")", () => {
                const text = `set a {
                    alpha = 1
                } 1s, "easeIn"
                then set a {
                    alpha = 0
                } 1s, "easeOut"`;
                const actual = parser.parse(text, { "startRule": "SetStatement" });
                const expected = {
                    "first": {
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
                    "then": [
                        {
                            "first": {
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
                            },
                            "then": null
                        }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });
        });

        describe("SetStatement Group", () => {
            it("should parse \"set\" statement with grouping", () => {
                const text = `set a {
                    alpha = 1
                } 1s, "easeIn"
                then {
                    set a {
                        alpha = 0
                    } 1s
                    set b {
                        alpha = 0.5
                    } 2s, "easeInOut"
                }`;
                const actual = parser.parse(text, { "startRule": "SetStatement" });
                const expected = {
                    "first": {
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
                    "then": [
                        {
                            "first": [
                                {
                                    "first": {
                                        "target": {
                                            "name": "a",
                                            "properties": [
                                                { "name": "alpha", "type": "primitive", "value": 0 }
                                            ]
                                        },
                                        "options": {
                                            "duration": 1,
                                            "defaultInterpolation": "linear"
                                        }
                                    },
                                    "then": null
                                },
                                {
                                    "first": {
                                        "target": {
                                            "name": "b",
                                            "properties": [
                                                { "name": "alpha", "type": "primitive", "value": 0.5 }
                                            ]
                                        },
                                        "options": {
                                            "duration": 2,
                                            "defaultInterpolation": "easeInOut"
                                        }
                                    },
                                    "then": null
                                }
                            ],
                            "then": null
                        }
                    ]
                };
                assert.deepStrictEqual(actual, expected);
            });

            it("should not allow \"set\" group nesting", () => {
                const text = `set a {
                    alpha = 1
                } 3s
                then {
                    {
                        set {
                            x = 2
                        }, 1s
                    }
                    {
                        set {
                            y = 3
                        }, 5s
                    }
                }`;

                try {
                    const actual = parser.parse(text, { "startRule": "SetStatement" });
                    const loc = {
                        "start": { "offset": 0, "line": 0, "column": 0 },
                        "end": { "offset": 0, "line": 0, "column": 0 }
                    };
                    throw new parser.SyntaxError("\"set\" groups should not be nested.", "", "", loc);
                } catch (ex) {
                    if (!(ex instanceof parser.SyntaxError)) {
                        throw ex;
                    }
                }
            });
        });
    });
});
