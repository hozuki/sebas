import Override from "../../../../common/decorators/Override";
import Sealed from "../../../../common/decorators/Sealed";
import ApplicationError from "../../../../common/errors/ApplicationError";
import BasHelper from "../../../parsing/BasHelper";
import BasSchemas from "../../../parsing/BasSchemas";
import BasValidator from "../../../parsing/BasValidator";
import BasProgram from "../../../parsing/parsed/BasProgram";
import DefObject from "../../../parsing/parsed/DefObject";
import SetObject from "../../../parsing/parsed/SetObject";
import TypedValue from "../../../parsing/parsed/TypedValue";
import ExecutionResult from "../../ExecutionResult";
import IUIElement from "../../IUIElement";
import StageContext from "../../StageContext";
import Css3AnimationHandle from "./Css3AnimationHandle";
import Css3Stage from "./Css3Stage";
import Css3UIElement from "./Css3UIElement";
import Css3ButtonElement from "./elements/Css3ButtonElement";
import NotImplementedError from "../../../../common/errors/NotImplemetedError";

@Sealed
export default class Css3StageContext extends StageContext {

    constructor(stage: Css3Stage) {
        super(stage);
    }

    createUIElement<K extends keyof Css3StageContextElementTypeNameMap>(type: K): Css3StageContextElementTypeNameMap[K];
    createUIElement(type: string): Css3UIElement;
    @Override()
    createUIElement(type: string): IUIElement {
        if (!constructors.has(type)) {
            throw new ApplicationError(`Type ${type} is not supported by Css3StageContext.`);
        }

        const ctor = constructors.get(type) as (c: Css3StageContext) => IUIElement;
        const createdObject = ctor(this);

        return createdObject;
    }

    @Override()
    execute(program: BasProgram): ExecutionResult {
        try {
            this.__createElements(program.defs);
        } catch (ex) {
            return {
                ok: false,
                errors: [ex.message]
            };
        }

        try {
            this.__setProperties(program.sets);
        } catch (ex) {
            return {
                ok: false,
                errors: [ex.message]
            };
        }

        return {
            ok: true
        };
    }

    getAnimation($in: string | HTMLElement | Css3UIElement): Css3AnimationHandle | null {
        if (!$in) {
            return null;
        }

        if (typeof($in) === "string") {
            if (!this._createdElements.has($in)) {
                return null;
            }

            const uiElem = this._createdElements.get($in);
            $in = uiElem.element;
        } else if ($in instanceof Css3UIElement) {
            $in = $in.element;
        } else if (!($in instanceof HTMLElement)) {
            throw new TypeError("Unsupported type for Css3StageContext.getAnimation().");
        }

        if (this._animationHandles.has($in)) {
            return this._animationHandles.get($in);
        } else {
            return null;
        }
    }

    $unregisterAnimation(handle: Css3AnimationHandle): boolean {
        if (!handle) {
            return false;
        }

        let foundHandle = false;
        let element = null;
        for (const [el, h] of this._animationHandles.entries()) {
            if (h === handle) {
                element = el;
                foundHandle = true;
            }
        }

        if (!foundHandle) {
            return false;
        }

        this._animationHandles.delete(element);

        return true;
    }

    // This method guarantees that when one of the creation fails, the internal state of current
    // stage context class instance is not changed.
    private __createElements(defs: DefObject[]): void {
        const createdElements = this._createdElements;
        const unpackedList: { [name: string]: { type: string; value: any } } = {};
        const createdList: { [name: string]: Css3UIElement } = {};

        for (const def of defs) {
            if (!(def.type in BasSchemas.elements)) {
                throw new TypeError(`Unknown type ${def.type}`);
            }

            if (createdElements.has(def.name)) {
                throw new Error(`'${name}' already exists.`);
            }

            const unpacked = BasHelper.unpack(def);
            const vr = BasValidator.detailedValidate(unpacked.value, BasSchemas.elements[def.type]);

            if (!vr.valid) {
                const message = vr.errors.map(r => r.message).reduce((sum, current) => `${sum}\n${current}`);
                throw new TypeError(message);
            }

            createdList[def.name] = this.createUIElement(def.type);
            unpackedList[def.name] = unpacked;
        }

        // record them...
        for (const name of Object.getOwnPropertyNames(createdList)) {
            createdElements.set(name, createdList[name]);
        }

        // set parents...
        for (const name of Object.getOwnPropertyNames(unpackedList)) {
            const props = unpackedList[name];

            let parentElement: HTMLElement = null;
            if ("parent" in props) {
                const parentName = (props["parent"] as TypedValue<string>).value;
                if (parentName) {
                    if (createdElements.has(parentName)) {
                        parentElement = createdElements.get(parentName).element;
                    } else {
                        console.warn(`Element named '${parentName}' not found for 'parent' property.`);
                    }
                } else {
                    console.warn("Empty or null parent name. Using stage root instead.");
                }
            }

            if (!parentElement) {
                parentElement = this.stage.view;
            }

            const thisElement = createdElements.get(name).element;

            parentElement.appendChild(thisElement);
            // TODO: deletion?
        }

        // and other properties
        for (const name of Object.getOwnPropertyNames(unpackedList)) {
            const props = unpackedList[name];
            const propNames = Object.getOwnPropertyNames(props);
            const elem = createdElements.get(name);

            for (const propName of propNames) {
                if (propName !== "parent") {
                    elem.setProperty(propName, props.value);
                }
            }
        }
    }

    private __setProperties(sets: SetObject[], immediate: boolean = true): void {
        handleSets(sets, immediate, this._createdElements, this._animationHandles);
    }

    private _animationHandles: Map<HTMLElement, Css3AnimationHandle> = new Map();
    private _createdElements: Map<string, Css3UIElement> = new Map();

}

interface Css3StageContextElementTypeNameMap {
    button: Css3ButtonElement;
}

const constructors: Map<string, Function> = new Map();
constructors.set("button", Css3ButtonElement);

interface SetPropEventNode {
    time: number;
    duration: number;
    animationProps: { [name: string]: any } | null;
    endProps: { [name: string]: any } | null;
    then: SetPropEventNode | null;
}

function handleSets(sets: SetObject[], immediate: boolean, createdElements: Map<string, Css3UIElement>, animationHandles: Map<HTMLElement, Css3AnimationHandle>): void {
    // 1. Generate keyframes. Each element is controlled by *1* <style>.
    // You should pre-calculate the delays and animation starting times.
    const setAnims = generateAnimationEventNodes(sets);
    const setAnimElemNames = Object.getOwnPropertyNames(setAnims);

    // 2. Create <style> elements.
    const styleElemMap: { [name: string]: HTMLStyleElement } = {};
    for (const name of setAnimElemNames) {
        styleElemMap[name] = document.createElement("style");
    }
    for (const name of setAnimElemNames) {
        generateKeyframeData(name, setAnimElemNames[name]);
    }
    for (const name of setAnimElemNames) {
        document.head.appendChild(styleElemMap[name]);
    }

    // 3. When each stage ends, there should always be a callback, even when it does nothing.
    // But normally, it will set other properties (non-animatable).

    // 4. Link HTML element to <style> via jQuery.Keyframes: create animation handles.
    const createdAnimations: { [name: string]: Css3AnimationHandle } = {};

    // 5. Play all the animations.
    if (immediate) {
        for (const name of Object.getOwnPropertyNames(createdAnimations)) {
            createdAnimations[name].play();
        }
    }
}

function generateAnimationEventNodes(sets: SetObject[]): { [name: string]: SetPropEventNode } {
    throw new NotImplementedError();
}

function generateKeyframeData(name: string, eventNode: SetPropEventNode): KeyframeData {
    throw new NotImplementedError();
}
