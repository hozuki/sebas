"use strict";

const fs = require("fs");
const peg = require("pegjs");
const chalk = require("chalk").default;

const grammarInPath = "src/moe/mottomo/sebas/parsing/grammar/bas.pegjs";
const parserOutPath = "src/moe/mottomo/sebas/parsing/grammar/bas_parser.js";

console.info(chalk.blue(`Reading grammar from ${grammarInPath} ...`));
const grammarFileContent = fs.readFileSync(grammarInPath, { "encoding": "utf-8" });

const allowedEntries = [
    "Program",
    "PrimitiveValue",
    "DefStatement",
    "DefSubPropObject",
    "SetStatement",
];

console.info(chalk.blue("Generating parser..."));
const parserSource = peg.generate(grammarFileContent, {
    "allowedStartRules": allowedEntries,
    "output": "source",
    "format": "commonjs"
});

console.info(chalk.blue(`Writing parser to ${parserOutPath} ...`));
fs.writeFileSync(parserOutPath, parserSource, { "encoding": "utf-8" })

console.info("Done.");
