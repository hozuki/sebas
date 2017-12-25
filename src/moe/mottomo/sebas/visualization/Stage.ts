import Helper from "../../common/Helper";
import Abstract from "../../common/decorators/Abstract";
import IStage from "./IStage";
import IStageContext from "./IStageContext";

@Abstract
abstract class Stage implements IStage {

    protected constructor(root: HTMLElement) {
        Helper.ensureNotNull(root);

        this._root = root!;
        this._view = this.createStage(root!);
    }

    createStage(root: HTMLElement): HTMLElement {
        if (this._view) {
            return this._view;
        }
    }

    abstract resize(width: number, height: number): void;

    abstract getContext(): IStageContext;

    get root(): HTMLElement {
        return this._root;
    }

    get view(): HTMLElement {
        return this._view;
    }

    private _root: HTMLElement = null;
    private _view: HTMLElement = null;

}

export default Stage;
