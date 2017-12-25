import IDisposable from "../../common/IDisposable";
import BasProgram from "../parsing/parsed/BasProgram";
import ExecutionResult from "./ExecutionResult";
import IStage from "./IStage";
import IUIElement from "./IUIElement";

interface IStageContext extends IDisposable {

    createUIElement(type: string): IUIElement;

    execute(program: BasProgram): ExecutionResult;

    readonly stage: IStage;

}

export default IStageContext;
