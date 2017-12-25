/**
 * @constructor
 */
const KeyframesController = (() => {
    const ANIM_PREFIX = "kf-test-";

    /**
     * @constructor
     */
    function KeyframesController() {
        this._id = 0;
        this._addedAnimations = new Map();
    }

    /**
     * @param el {HTMLElement}
     */
    KeyframesController.prototype.addAnimation = function (el) {
        if (!(el instanceof HTMLElement)) {
            return;
        }

        if (this._addedAnimations.has(el)) {
            return;
        }

        const id = this._id++;
        const animName = ANIM_PREFIX + id;

        const styleElem = document.createElement("style");
        styleElem.id = animName;
        document.head.appendChild(styleElem);

        const animData = {
            name: animName,
            "0%": {
                transform: "rotate(0deg)"
            },
            "50%": {
                transform: "rotate(180deg)"
            },
            "100%": {
                transform: "rotate(360deg)"
            }
        };
        $.keyframe.define(animData);

        el.style[PrefixFree.prefixProperty("transform-origin", true)] = "0px 0px";

        this._addedAnimations.set(el, id);
    };

    KeyframesController.prototype.resumeAll = function () {
        this._addedAnimations.forEach((_, k) => {
            $(k).resumeKeyframe();
        });
    };

    KeyframesController.prototype.pauseAll = function () {
        this._addedAnimations.forEach((_, k) => {
            $(k).pauseKeyframe();
        });
    };

    KeyframesController.prototype.playAll = function () {
        const playParam = {
            name: null,
            duration: "5s",
            timingFunction: "linear",
            iterationCount: "infinite"
        };

        this._addedAnimations.forEach((v, k) => {
            playParam.name = ANIM_PREFIX + v;
            $(k).playKeyframe(playParam);
        });
    };

    KeyframesController.prototype.resetAll = function () {
        this._addedAnimations.forEach((_, k) => {
            $(k).resetKeyframe();
        });
    };

    if (typeof(module) === "object" && module) {
        module.exports = KeyframesController;
    }

    register(KeyframesController, "KeyframesController");

    return KeyframesController;
})();
