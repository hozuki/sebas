import Override from "../../../../common/decorators/Override";
import Sealed from "../../../../common/decorators/Sealed";
import IStageContext from "../../IStageContext";
import Stage from "../../Stage";
import Css3StageContext from "./Css3StageContext";

@Sealed
export default class Css3Stage extends Stage {

    constructor(root: HTMLElement) {
        super(root);
    }

    @Override()
    createStage(root: HTMLElement): HTMLElement {
        if (this.view) {
            return this.view;
        }

        const div = document.createElement("div");
        root.appendChild(div);

        return div;
    }

    @Override()
    resize(width: number, height: number): void {
        width = Number(width);
        height = Number(height);

        this.view.style.width = width + "px";
        this.view.style.height = height + "px";
    }

    @Override()
    getContext(): IStageContext {
        if (!this._stageContext) {
            this._stageContext = new Css3StageContext(this);
        }

        return this._stageContext;
    }

    private _stageContext: IStageContext = null;

}
