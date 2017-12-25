import IDisposable from "../../common/IDisposable";
import AnimationState from "./AnimationState";
import IStageContext from "./IStageContext";

interface IAnimationHandle extends IDisposable {

    play(): void;

    pause(): void;

    resume(): void;

    stop(): void;

    readonly state: AnimationState;

    readonly $stageContext: IStageContext;

}

export default IAnimationHandle;
