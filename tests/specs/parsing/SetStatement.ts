import * as assert from "assert";
import * as parser from "../../../src/moe/mottomo/sebas/parsing/grammar/bas_parser";

describe("Parsing", () => {
    describe("\"set\" Statement", () => {
        describe("Single", () => {
            it("should parse single \"set\" statement", () => {
                const text = `set t {
                    x = 100
                    y = [100, "easeOut"]
                    alpha = 1
                } 1s, "linear"`;
                const actual = parser.parse(text, {"startRule": "SetStatement"});
                const expected = {
                    "first": {
                        "target": {
                            "name": "t",
                            "properties": [
                                {"name": "x", "value": {"type": "number", "value": 100}},
                                {
                                    "name": "y", "value": {
                                    "type": "interpolation",
                                    "value": {
                                        "targetValue": {
                                            "type": "number",
                                            "value": 100
                                        },
                                        "method": {
                                            "type": "string",
                                            "value": "easeOut"
                                        }
                                    }
                                }
                                },
                                {"name": "alpha", "value": {"type": "number", "value": 1}}
                            ]
                        },
                        "options": {
                            "duration": {
                                "type": "time",
                                "value": 1
                            },
                            "defaultInterpolationMethod": {
                                "type": "string",
                                "value": "linear"
                            }
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
                const actual = parser.parse(text, {"startRule": "SetStatement"});
                const expected = {
                    "first": {
                        "target": {
                            "name": "a",
                            "properties": [
                                {"name": "alpha", "value": {"type": "number", "value": 1}}
                            ]
                        },
                        "options": {
                            "duration": {
                                "type": "time",
                                "value": 1
                            },
                            "defaultInterpolationMethod": {
                                "type": "string",
                                "value": "easeIn"
                            }
                        }
                    },
                    "then": [
                        {
                            "first": {
                                "target": {
                                    "name": "a",
                                    "properties": [
                                        {"name": "alpha", "value": {"type": "number", "value": 0}}
                                    ]
                                },
                                "options": {
                                    "duration": {
                                        "type": "time",
                                        "value": 1
                                    },
                                    "defaultInterpolationMethod": {
                                        "type": "string",
                                        "value": "easeOut"
                                    }
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
                const actual = parser.parse(text, {"startRule": "SetStatement"});
                const expected = {
                    "first": {
                        "target": {
                            "name": "a",
                            "properties": [
                                {"name": "alpha", "value": {"type": "number", "value": 1}}
                            ]
                        },
                        "options": {
                            "duration": {
                                "type": "time",
                                "value": 1
                            },
                            "defaultInterpolationMethod": {
                                "type": "string",
                                "value": "easeIn"
                            }
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
                                                {"name": "alpha", "value": {"type": "number", "value": 0}}
                                            ]
                                        },
                                        "options": {
                                            "duration": {
                                                "type": "time",
                                                "value": 1
                                            },
                                            "defaultInterpolationMethod": {
                                                "type": "string",
                                                "value": "linear"
                                            }
                                        }
                                    },
                                    "then": null
                                },
                                {
                                    "first": {
                                        "target": {
                                            "name": "b",
                                            "properties": [
                                                {"name": "alpha", "value": {"type": "number", "value": 0.5}}
                                            ]
                                        },
                                        "options": {
                                            "duration": {
                                                "type": "time",
                                                "value": 2
                                            },
                                            "defaultInterpolationMethod": {
                                                "type": "string",
                                                "value": "easeInOut"
                                            }
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

                let parseSuccessful = false;
                const loc = {
                    "start": {"offset": 0, "line": 0, "column": 0},
                    "end": {"offset": 0, "line": 0, "column": 0}
                };

                try {
                    const actual = parser.parse(text, {"startRule": "SetStatement"});
                    parseSuccessful = true;
                } catch (ex) {
                    if (!(ex instanceof parser.SyntaxError)) {
                        throw ex;
                    }
                }

                if (parseSuccessful) {
                    throw new parser.SyntaxError("\"set\" groups should not be nested.", "", "", loc);
                }
            });
        });
    });
});
