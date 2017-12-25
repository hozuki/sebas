interface JQueryKeyframe {

    getVendorPrefix(): string;

    isSupported(): boolean;

    generate(data: KeyframeData): void;

    define(data: KeyframeData): void;

    define(data: KeyframeData[]): void;

    debug: boolean;

}

interface KeyframeData {

    name?: string;

    [key: string]: any;

}

interface KeyframePlayOptions {

    name: string;
    duration?: string;
    timingFunction?: string;
    delay?: string;
    iterationCount?: number;
    direction?: string;
    fillMode?: string;

}

interface JQueryStatic {

    readonly keyframe: JQueryKeyframe;

}

interface JQuery {

    resetKeyframe(callback?: Function): void;

    pauseKeyframe(): void;

    resumeKeyframe(): void;

    playKeyframe(options: KeyframePlayOptions | string, callback?: Function): JQuery;

    playKeyframe(optionList: (KeyframePlayOptions | string)[], callback?: Function): JQuery;

}

declare module "jquerykeyframes" {

}
