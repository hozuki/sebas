import EventHandler from "../../../../../common/EventHandler";
import Override from "../../../../../common/decorators/Override";
import Css3StageContext from "../Css3StageContext";
import Css3UIElement from "../Css3UIElement";

export default class Css3ButtonElement extends Css3UIElement {

    constructor(context: Css3StageContext) {
        super(context);
    }

    setClickTarget(av: number, page: number, time: number): void {
        if (this._lastClickHandler) {
            this.removeClickHandler(this._lastClickHandler);
            this._lastClickHandler = null;
        }

        const url = `//www.bilibili.com/video/av${av | 0}/index_${page | 0}.html?t=${time}`;
        const handler = (ev: MouseEvent) => {
            if (ev.button === 0) {
                window.open(url, "_blank");
            }
        };
        this.addClickHandler(handler);
        this._lastClickHandler = handler;
    }

    @Override()
    protected createHtmlElement(): HTMLElement {
        return document.createElement("button");
    }

    @Override()
    protected _$dispose() {
        if (this._lastClickHandler) {
            this.removeClickHandler(this._lastClickHandler);
            this._lastClickHandler = null;
        }
    }

    private addClickHandler(handler: EventHandler<HTMLButtonElement, MouseEvent>): void {
        this.native.addEventListener("click", handler);
    }

    private removeClickHandler(handler: EventHandler<HTMLButtonElement, MouseEvent>): void {
        this.native.removeEventListener("click", handler);
    }

    private _lastClickHandler: EventHandler<HTMLButtonElement, MouseEvent> = null;

}
