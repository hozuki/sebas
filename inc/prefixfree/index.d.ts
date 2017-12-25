interface StyleFix {

    register(callback: (css: string, raw: boolean, element: HTMLElement) => string): void;

    link(linkElement: HTMLLinkElement): void;

    styleElement(styleElement: HTMLStyleElement): void;

    styleAttribute(element: HTMLElement): void;

    camelCase(str: string): string;

    deCamelCase(str: string): string;

    readonly fixers: ((css: string, raw: boolean, element: HTMLElement) => string)[];

}

interface PrefixFree {

    prefixCSS(code: string, raw?: boolean): string;

    prefixSelector(selector: string): string;

    prefixProperty(property: string, camelCase?: boolean): string;

    readonly prefix: string;

    readonly Prefix: string;

    readonly properties: { [key: string]: object };

    readonly functions: { [key: string]: object };

    readonly keywords: { [key: string]: string };

    readonly selectors: { [key: string]: object };

    readonly atrules: { [key: string]: object };

}

declare const StyleFix: StyleFix;
declare const PrefixFree: PrefixFree;
