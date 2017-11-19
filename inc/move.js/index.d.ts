declare const move: MoveJS.MoveJSModule;

declare module "move-js" {
    export = move;
}

declare module MoveJS {

    interface MoveEase {
        readonly "in": string;
        readonly "out": string ;
        readonly "in-out": string;
        readonly "snap": string;
        readonly "linear": string;

        readonly "ease-in-quad": string;
        readonly "ease-in-cubic": string;
        readonly "ease-in-quart": string;
        readonly "ease-in-quint": string;
        readonly "ease-in-sine": string;
        readonly "ease-in-expo": string;
        readonly "ease-in-circ": string;
        readonly "ease-in-back": string;

        readonly "ease-out-quad": string;
        readonly "ease-out-cubic": string;
        readonly "ease-out-quart": string;
        readonly "ease-out-quint": string;
        readonly "ease-out-sine": string;
        readonly "ease-out-expo": string;
        readonly "ease-out-circ": string;
        readonly "ease-out-back": string;

        readonly "ease-in-out-quart": string;
        readonly "ease-in-out-quint": string;
        readonly "ease-in-out-sine": string;
        readonly "ease-in-out-expo": string;
        readonly "ease-in-out-circ": string;
        readonly "ease-in-out-back": string;
    }

    export interface MoveOptions {
        duration: number;
    }

    export class Move extends NodeJS.EventEmitter {

        constructor(element: HTMLElement | string);

        static select(selector: string);

        transform(transform: string): this;

        skew(x: number, y: number): this;

        skewX(value: number): this;

        skewY(value: number): this;

        translate(x: number, y?: number): this;

        to(x: number, y?: number): this;

        translateX(value: number): this;

        x(value: number): this;

        translateY(value: number): this;

        y(value: number): this;

        scale(x: number, y?: number): this;

        scaleX(value: number): this;

        scaleY(value: number): this;

        matrix(m11: Number, m12: number, m21: number, m22: number, m31: number, m32: number): this;

        rotate(deg: number): this;

        ease(ease: string): this;
        ease(fn: Function): this;

        animate(name: string, props: object): this;

        duration(seconds: string): this;
        duration(seconds: number): this;

        delay(seconds: string): this;
        delay(seconds: number): this;

        setProperty(property: string, value: any): this;

        setVendorProperty(property: string, value: any): this;

        set(property: object, value: any): this;
        set(transition: string, value: any): this;

        add(property: object, value: any): this;
        add(transition: string, value: any): this;

        sub(property: object, value: any): this;
        sub(transition: string, value: any): this;

        current(property: string): any;

        move(selector: string): this;

        select(selector: string): this;

        then(fn: Function): this;
        then(move: Move): this;

        pop(): Move;

        reset(): this;

        end(fn?: Function): this;

        static readonly version: string;

        static readonly defaults: MoveOptions;

        static readonly ease: MoveEase;

    }

    interface MoveJSModule {

        new(element: HTMLElement | string): Move;

        (element: HTMLElement | string): Move;

        all(selector: string, element?: HTMLElement): this;

        select(selector: string): Move;

        readonly version: string;

        readonly defaults: MoveOptions;

        readonly ease: MoveEase;

    }

}
