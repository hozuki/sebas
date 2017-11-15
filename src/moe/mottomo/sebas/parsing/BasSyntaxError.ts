import * as parser from "./grammar/bas_parser";
import BasGrammarLocation from "./BasGrammarLocation";

interface BasSyntaxError extends Error {

    expected?: string;
    found?: string;
    location?: BasGrammarLocation;

}

interface BasSyntaxErrorConstructor {

    new(message?: string, expected?: string, found?: string, location?: BasGrammarLocation): BasSyntaxError;
    (message?: string, expected?: string, found?: string, location?: BasGrammarLocation): BasSyntaxError;

    readonly prototype: BasSyntaxError;

    buildMessage(expected: string, found: string): string;

}

const SyntaxError = <BasSyntaxErrorConstructor><any>parser.SyntaxError;

export default SyntaxError;
