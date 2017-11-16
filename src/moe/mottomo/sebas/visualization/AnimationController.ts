import Abstract from "../../common/decorators/Abstract";
import IAnimationController from "./IAnimationController";

@Abstract
abstract class AnimationController implements IAnimationController {

    abstract areAnimationsRunningOn(obj: Object): boolean;

    abstract runAnimations(obj: Object): void;

    abstract pauseAnimations(obj: Object): void;

}

export default AnimationController;
