import * as move from "move-js";
import Override from "../moe/mottomo/common/decorators/Override";

export default class MoveEx extends move {

    constructor(el: HTMLElement | string) {
        super(el);
    }

    @Override()
    to(x: number, y?: number, z?: number): this {
        if (arguments.length < 3) {
            return super.to(x, y);
        } else {
            return this.translate3D(x, y, z);
        }
    }

    translate3D(x: number, y?: number, z?: number): this {
        y = typeof(y) === "number" ? y : 0;
        z = typeof(z) === "number" ? z : 0;

        return this.transform(`translate3D(${x}px,${y}px,${z}px)`);
    }

    translateZ(value: number): this {
        return this.transform(`translateZ(${value}px)`);
    }

    z(value: number): this {
        return this.translateZ(value);
    }

    scaleZ(value: number): this {
        return this.transform(`scaleZ(${value})`);
    }

    scale(value: number): this;
    scale(x: number, y: number): this;
    @Override()
    scale(x: number, y?: number): this {
        // Please notice the behavior difference compared to original:
        // https://github.com/visionmedia/move.js/blob/dfa94d0a55e41cc6321282ab49eea5f40afb68b2/move.js#L903-L908
        y = typeof(y) === "number" ? y : x;

        return super.scale(x, y);
    }

    scale3D(value: number): this;
    scale3D(x: number, y: number, z: number): this;
    scale3D(x: number, y?: number, z?: number): this {
        y = typeof(y) === "number" ? y : x;
        z = typeof(z) === "number" ? z : x;

        return this.transform(`scale3D(${x},${y},${z})`);
    }

    rotateX(deg: number): this {
        return this.transform(`rotateX(${deg}deg)`);
    }

    rotateY(deg: number): this {
        return this.transform(`rotateY(${deg}deg)`);
    }

    rotateZ(deg: number): this {
        return this.transform(`rotateZ(${deg}deg)`);
    }

    rotate3D(x: number, y: number, z: number, deg: number): this {
        return this.transform(`rotate3D(${x},${y},${z},${deg}deg`);
    }

    matrix3D(m11: number, m21: number, m31: number, m41: number, m12: number, m22: number, m32: number, m42: number,
             m13: number, m23: number, m33: number, m43: number, m14: number, m24: number, m34: number, m44: number): this {
        const arr = [
            m11, m21, m31, m41,
            m12, m22, m32, m42,
            m13, m23, m33, m43,
            m14, m24, m34, m44
        ];
        const s = arr.join(",");

        return this.transform(`matrix3D(${s})`);
    }

    perspective(px: number): this {
        return this.transform(`perspective(${px}px)`);
    }

    perspectiveCentimeter(cm: number): this {
        return this.transform(`perspective(${cm}cm)`);
    }

}
