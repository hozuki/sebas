import RgbaColor from "./RgbaColor";
import ArgumentOutOfRangeError from "./errors/ArgumentOutOfRangeError";

abstract class CssHelper {

    static parseColor(color: number): RgbaColor;
    static parseColor(css: string, defaultValue?: number): RgbaColor;
    static parseColor(toParse?: any, def?: any): RgbaColor {
        if (typeof (toParse) === "number") {
            toParse |= 0;

            const b = toParse & 0xff;
            const g = (toParse & 0xff00) >> 8;
            const r = (toParse & 0xff0000) >> 16;
            const a = ((toParse & 0xff000000) >> 24) / 255;

            return {r, g, b, a};
        } else if (typeof (toParse) === "string") {
            if (!toParse) {
                if (typeof(def) === "undefined") {
                    def = 0xffffffff;
                }

                return CssHelper.parseColor(Number(def));
            }

            let css = toParse as string;
            css = css.trim().toLowerCase();

            if (css.startsWith("#") && css.length > 1) {
                const raw = CssHelper.parseColor(Number.parseInt(css.substring(1)));
                raw.a = 1;

                return raw;
            } else {
                let match: RegExpMatchArray;

                if (match = rgbPattern.exec(css)) {
                    return {
                        r: Number.parseInt(match[0]),
                        g: Number.parseInt(match[1]),
                        b: Number.parseInt(match[2]),
                        a: 1
                    };
                } else if (match = rgbPattern.exec(css)) {
                    return {
                        r: Number.parseInt(match[0]),
                        g: Number.parseInt(match[1]),
                        b: Number.parseInt(match[2]),
                        a: Number.parseFloat(match[3])
                    };
                } else {
                    throw new TypeError("Unrecognized color style format.");
                }
            }
        } else {
            throw new TypeError("Expected a string or number for color parsing.");
        }
    }

    static getRgba(color: RgbaColor): string {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    }

    static getRgb(color: RgbaColor): string {
        return `rgb(${color.r},${color.g},${color.b})`;
    }

    static getNumber(color: RgbaColor): number {
        const a = (color.a * 255) | 0;

        return a << 24 | color.r << 16 | color.g << 8 | color.b;
    }

    static getRgbLiteral(color: RgbaColor): string {
        return "#" + CssHelper.getNumber(color).toString(16);
    }

    static modifyColor(color: RgbaColor, value: number, setAlpha?: boolean): void;
    static modifyColor(color: RgbaColor, field: "r" | "g" | "b" | "a", value: number): void;
    static modifyColor(color: RgbaColor, valueOrField: any, p2?: any): void {
        if (typeof(valueOrField) === "number") {
            const r = (valueOrField & 0xff0000) >> 16;
            const g = (valueOrField & 0xff00) >> 8;
            const b = valueOrField & 0xff;

            color.r = r;
            color.g = g;
            color.b = b;

            if (typeof(p2) === "undefined") {
                p2 = true;
            }

            if (p2) {
                color.a = ((valueOrField & 0xff000000) >> 24) / 255;
            }
        } else if (typeof(valueOrField) === "string") {
            switch (valueOrField) {
                case "r":
                case "g":
                case "b":
                case "a":
                    color[valueOrField] = p2;
                    break;
                default:
                    throw new ArgumentOutOfRangeError("Invalid color field.", "field");
            }
        } else {
            throw new SyntaxError();
        }
    }

}

const rgbPattern = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
const rgbaPattern = /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*((?:\d+)(?:\.\d*)?|\.\d+)\s*\)/;

export default CssHelper;
