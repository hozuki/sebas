import ArgumentOutOfRangeError from "./errors/ArgumentOutOfRangeError";

const enum ClockMode {
    Performance = 1,
    ProcessHRTime = 2,
    ProcessUpTime = 3,
    DateNow = 4
}

abstract class Clock {

    constructor() {
        this.reset();
    }

    update(): void {
        let newValue: any;

        switch (this.mode) {
            case ClockMode.Performance: {
                newValue = performance.now();
                const newTotal = newValue - this._start;
                this._delta = newTotal - this._total;
                this._total = newTotal;
                break;
            }
            case ClockMode.ProcessHRTime: {
                const end = process.hrtime(this._start);
                const elapsedMs = end[0] * 1000 + (end[1] / 1000000);
                this._delta = elapsedMs - this._total;
                this._total = elapsedMs;
                break;
            }
            case ClockMode.ProcessUpTime: {
                newValue = process.uptime() / 1000;
                const newTotal = newValue - this._start;
                this._delta = newTotal - this._total;
                this._total = newTotal;
                break;
            }
            case ClockMode.DateNow: {
                newValue = Date.now();
                const newTotal = newValue - this._start;
                this._delta = newTotal - this._total;
                this._total = newTotal;
                break;
            }
            default:
                throw new ArgumentOutOfRangeError();
        }
    }

    reset(): void {
        switch (this.mode) {
            case ClockMode.Performance:
                this._start = performance.now();
                break;
            case ClockMode.ProcessHRTime:
                this._start = process.hrtime();
                break;
            case ClockMode.ProcessUpTime:
                this._start = process.uptime() / 1000;
                break;
            case ClockMode.DateNow:
                this._start = Date.now();
                break;
            default:
                throw new ArgumentOutOfRangeError();
        }
    }

    get total(): number {
        return this._total;
    }

    get delta(): number {
        return this._delta;
    }

    get mode(): ClockMode {
        return this._clockMode;
    }

    private static __detectMode(): ClockMode {
        if (performance && typeof(performance.now) === "function") {
            return ClockMode.Performance;
        } else if (process) {
            if (typeof(process.hrtime) === "function") {
                return ClockMode.ProcessHRTime;
            } else if (typeof(process.uptime) === "function") {
                return ClockMode.ProcessUpTime;
            }
        }

        return ClockMode.DateNow;
    }

    private _clockMode: ClockMode = Clock.__detectMode();
    private _start: any;
    private _total: number = 0;
    private _delta: number = 0;

}

export default Clock;
