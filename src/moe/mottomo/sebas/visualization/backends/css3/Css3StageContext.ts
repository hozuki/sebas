import Override from "../../../../common/decorators/Override";
import Sealed from "../../../../common/decorators/Sealed";
import ApplicationError from "../../../../common/errors/ApplicationError";
import IUIElement from "../../IUIElement";
import StageContext from "../../StageContext";
import UIElement from "../../UIElement";
import Css3Stage from "./Css3Stage";
import Css3ButtonElement from "./elements/Css3ButtonElement";

@Sealed
export default class Css3StageContext extends StageContext {

    constructor(stage: Css3Stage) {
        super(stage);
    }

    createUIElement<K extends keyof Css3StageContextElementTypeNameMap>(type: K): Css3StageContextElementTypeNameMap[K];
    createUIElement(type: string): UIElement;
    @Override()
    createUIElement(type: string): IUIElement {
        if (!constructors.has(type)) {
            throw new ApplicationError(`Type ${type} is not supported by Css3StageContext.`);
        }

        const ctor = constructors.get(type) as (c: Css3StageContext) => IUIElement;
        const createdObject = ctor(this);

        return createdObject;
    }

}

interface Css3StageContextElementTypeNameMap {
    "button": Css3ButtonElement;
}

const constructors: Map<string, Function> = new Map();
constructors.set("button", Css3ButtonElement);
