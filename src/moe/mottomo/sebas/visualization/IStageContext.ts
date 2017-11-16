import IDisposable from "../../common/IDisposable";
import IStage from "./IStage";
import IUIElement from "./IUIElement";

interface IStageContext extends IDisposable {

    createUIElement(type: string): IUIElement;

    readonly stage: IStage;

}

export default IStageContext;
