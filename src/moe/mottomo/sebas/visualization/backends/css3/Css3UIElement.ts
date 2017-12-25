import MoveEx from "../../../../../../movejs/MoveEx";
import CssHelper from "../../../../common/CssHelper";
import Helper from "../../../../common/Helper";
import RgbaColor from "../../../../common/RgbaColor";
import Abstract from "../../../../common/decorators/Abstract";
import Override from "../../../../common/decorators/Override";
import NotImplementedError from "../../../../common/errors/NotImplemetedError";
import AnimatedValue from "../../../parsing/parsed/AnimatedValue";
import IAnimationHandle from "../../IAnimationHandle";
import UIElement from "../../UIElement";
import Css3StageContext from "./Css3StageContext";

@Abstract
abstract class Css3UIElement extends UIElement {

    protected constructor(context: Css3StageContext) {
        super(context);

        const element = this.createHtmlElement();
        context.stage.view.appendChild(element);
        this._element = element;
    }

    setProperty<K extends keyof ElementPropertiesTypeNameMap>(propName: string, propValue: ElementPropertiesTypeNameMap[K]): void;
    @Override()
    setProperty(propName: string, propValue: any): void {
        Helper.ensureNotNull(propName);

        const element = this._element;
        switch (propName) {
            case "x":
                element.style.left = Number(propValue) + "px";
                break;
            case "y":
                element.style.top = Number(propValue) + "px";
                break;
            case "text":
                element.textContent = String(propValue);
                break;
            case "fontSize":
                element.style.fontSize = Number(propValue) + "pt";
                break;
            case "textColor": {
                const color = Number(propValue);
                const textColor = this._textColor;
                CssHelper.modifyColor(textColor, color, false);
                element.style.color = CssHelper.getRgbLiteral(textColor);
                break;
            }
            case "fillColor": {
                const color = Number(propValue);
                const fillColor = this._fillColor;
                CssHelper.modifyColor(fillColor, color, false);
                element.style.backgroundColor = CssHelper.getRgba(fillColor);
                break;
            }
            case "fillAlpha": {
                const alpha = Number(propValue);
                const fillColor = this._fillColor;
                CssHelper.modifyColor(fillColor, "a", alpha);
                element.style.backgroundColor = CssHelper.getRgba(fillColor);
                break;
            }
            default:
                break;
        }
    }

    setPropertyAnimated<K extends keyof ElementPropertiesTypeNameMap>(propName: string, propValue: AnimatedValue<ElementPropertiesTypeNameMap[K]>): IAnimationHandle;
    @Override()
    setPropertyAnimated(propName: string, propValue: AnimatedValue<any>): IAnimationHandle {
        const m = new MoveEx(this._element);
        const easeName = CssHelper.flashEasingToCssEasing(propValue.easing);
        m.ease(easeName);

        throw new NotImplementedError();

        // return new Css3AnimationHandle(this, propName, m);
    }

    get element(): HTMLElement {
        return this._element;
    }

    protected abstract createHtmlElement(): HTMLElement;

    private _textColor: RgbaColor = {r: 0, g: 0, b: 0, a: 1};
    private _fillColor: RgbaColor = {r: 0xff, g: 0xff, b: 0xff, a: 0};
    private _element: HTMLElement = null;

}

export default Css3UIElement;

interface ElementPropertiesTypeNameMap {
    "x": number;
    "y": number;
    "text": string;
    "fontSize": number;
    "textColor": number;
    "fillColor": number;
    "fillAlpha": number;
}
