import * as parser from "./grammar/bas_parser";
import BasParserOptions from "./BasParserOptions";

export default class BasParser {

    parse(text: string, options?: BasParserOptions): any {
        return parser.parse(text, options);
    }

}
