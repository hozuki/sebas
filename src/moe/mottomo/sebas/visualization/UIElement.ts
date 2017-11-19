import DisposableBase from "../../common/DisposableBase";
import Helper from "../../common/Helper";
import Abstract from "../../common/decorators/Abstract";
import Override from "../../common/decorators/Override";
import AnimatedValue from "../parsing/parsed/AnimatedValue";
import IAnimationHandle from "./IAnimationHandle";
import IStageContext from "./IStageContext";
import IUIElement from "./IUIElement";

@Abstract
abstract class UIElement extends DisposableBase implements IUIElement {

    protected constructor(context: IStageContext) {
        super();

        Helper.ensureNotNull(context);

        this._stageContext = context!;
    }

    get stageContext(): IStageContext {
        return this._stageContext;
    }

    abstract setProperty(propName: string, propValue: any): void;

    abstract setPropertyAnimated(propName: string, propValue: AnimatedValue<any>): IAnimationHandle;

    @Override()
    protected _$dispose(): void {
    }

    private _stageContext: IStageContext;

}

export default UIElement;
