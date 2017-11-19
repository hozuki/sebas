import AnimationState from "./AnimationState";

interface IAnimationHandle {

    pause(): void;

    resume(): void;

    stop(): void;

    getCurrentValue(): any;

    readonly state: AnimationState;

}

export default IAnimationHandle;
