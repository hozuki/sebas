import DisposableBase from "../../common/DisposableBase";
import Helper from "../../common/Helper";
import Abstract from "../../common/decorators/Abstract";
import Override from "../../common/decorators/Override";
import IStage from "./IStage";
import IStageContext from "./IStageContext";
import IUIElement from "./IUIElement";

@Abstract
abstract class StageContext extends DisposableBase implements IStageContext {

    protected constructor(stage: IStage) {
        super();

        Helper.ensureNotNull(stage);

        this._stage = stage;
    }

    get stage(): IStage {
        return this._stage;
    }

    abstract createUIElement(type: string): IUIElement;

    @Override()
    protected _$dispose(): void {
    }

    private _stage: IStage;

}

export default StageContext;
