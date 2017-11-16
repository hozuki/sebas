interface IAnimationController {

    areAnimationsRunningOn(obj: object): boolean;

    runAnimations(obj: object): void;

    pauseAnimations(obj: object): void;

}

export default IAnimationController;
