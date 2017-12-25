import DisposableBase from "../../../../common/DisposableBase";
import Override from "../../../../common/decorators/Override";
import AnimationState from "../../AnimationState";
import IAnimationHandle from "../../IAnimationHandle";
import Css3UIElement from "./Css3UIElement";
import Css3StageContext from "./Css3StageContext";

export default class Css3AnimationHandle extends DisposableBase implements IAnimationHandle {

    constructor(context: Css3StageContext, options: KeyframePlayOptions, uiElement: Css3UIElement, styleElement: HTMLStyleElement) {
        super();

        this._stageContext = context;
        this._options = options;
        this._uiElement = uiElement;
        this._styleElement = styleElement;
    }

    play(): void {
        if (this.state !== AnimationState.Paused && this.state !== AnimationState.Stopped) {
            return;
        }

        $(this._uiElement.element).playKeyframe(this._options);
    }

    pause(): void {
        if (this.state !== AnimationState.Playing) {
            return;
        }

        $(this._uiElement.element).pauseKeyframe();
    }

    resume(): void {
        if (this.state !== AnimationState.Paused) {
            return;
        }

        $(this._uiElement.element).resumeKeyframe();
    }

    stop(): void {
        if (this.state !== AnimationState.Playing && this.state !== AnimationState.Paused) {
            return;
        }

        $(this._uiElement.element).resetKeyframe();
    }

    get state(): AnimationState {
        return this._state;
    }

    get $stageContext(): Css3StageContext {
        return this._stageContext;
    }

    @Override()
    protected _$dispose(): void {
        if (!this._styleElement) {
            return;
        }

        this.$stageContext.$unregisterAnimation(this);

        if (this._styleElement.parentElement) {
            this._styleElement.parentElement.removeChild(this._styleElement);
        }

        this._styleElement = null;
        this._uiElement = null;
    }

    private _state: AnimationState = AnimationState.Unknown;
    private _stageContext: Css3StageContext = null;
    private _options: KeyframePlayOptions = null;
    private _uiElement: Css3UIElement = null;
    private _styleElement: HTMLStyleElement = null;

}
