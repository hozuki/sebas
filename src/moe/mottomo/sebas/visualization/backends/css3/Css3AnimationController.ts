import Override from "../../../../common/decorators/Override";
import Sealed from "../../../../common/decorators/Sealed";
import AnimationController from "../../AnimationController";

// https://www.w3schools.com/cssref/css3_pr_animation-play-state.asp
const animationPlayStateKey = "animationPlayState";

@Sealed
export default class Css3AnimationController extends AnimationController {

    @Override()
    areAnimationsRunningOn(obj: object): boolean {
        const elem = obj as HTMLElement;
        const state = elem.style[animationPlayStateKey];

        return state === "" || state === "running";
    }

    @Override()
    runAnimations(obj: object): void {
        const elem = obj as HTMLElement;
        elem.style[animationPlayStateKey] = "running";
    }

    @Override()
    pauseAnimations(obj: object): void {
        const elem = obj as HTMLElement;
        elem.style[animationPlayStateKey] = "paused";
    }

}
