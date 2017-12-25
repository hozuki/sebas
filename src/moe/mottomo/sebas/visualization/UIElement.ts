import DisposableBase from "../../common/DisposableBase";
import Helper from "../../common/Helper";
import Abstract from "../../common/decorators/Abstract";
import Override from "../../common/decorators/Override";
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

    @Override()
    protected _$dispose(): void {
    }

    private _stageContext: IStageContext;

}

export default UIElement;
