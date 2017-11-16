import IStageContext from "./IStageContext";

interface IStage {

    createStage(root: HTMLElement): HTMLElement;

    resize(width: number, height: number): void;

    getContext(): IStageContext;

    readonly root: HTMLElement;
    readonly view: HTMLElement;

}

export default IStage;
