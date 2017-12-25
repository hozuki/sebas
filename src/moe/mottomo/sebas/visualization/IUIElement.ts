import IDisposable from "../../common/IDisposable";
import IStageContext from "./IStageContext";

interface IUIElement extends IDisposable {

    setProperty(propName: string, propValue: any): void;

    readonly stageContext: IStageContext;

}

export default IUIElement;
