import IDisposable from "./IDisposable";
import Abstract from "./decorators/Abstract";
import Sealed from "./decorators/Sealed";

@Abstract
abstract class DisposableBase implements IDisposable {

    @Sealed()
    dispose(): void {
        if (!this._isDisposed) {
            this._$dispose();
        }
        this._isDisposed = true;
    }

    get isDisposed(): boolean {
        return this._isDisposed;
    }

    protected abstract _$dispose(): void;

    private _isDisposed: boolean = false;

}

export default DisposableBase;
