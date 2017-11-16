import BasParserOptions from "./BasParserOptions";
import * as parser from "./grammar/bas_parser";

abstract class BasParser {

    static parse(text: string, options?: BasParserOptions): any {
        return parser.parse(text, options);
    }

    static parseAs<T>(text: string, options?: BasParserOptions): T {
        return BasParser.parse(text, options) as T;
    }

}

export default BasParser;
