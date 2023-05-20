type tStopWatchConstructorArgs = {
  onChange: (sec: number) => void;
};
class Stopwatch {
  interval = 0;
  startTime = 0;
  lastTime = 0;
  isCounting = false;

  onChange?: (seconds: number) => void;
  static countDuration(startTime: number, endTime: number): number {
    if (!endTime) return 0;
    return Math.floor((endTime - startTime) / 1000);
  }

  constructor(args?: tStopWatchConstructorArgs) {
    if (args?.onChange) {
      this.onChange = args?.onChange;
    }
    this.init();
  }

  get seconds(): number {
    return Stopwatch.countDuration(this.startTime, this.lastTime);
  }

  start(): void {
    if (!this.interval) {
      const now = Date.now();
      this.isCounting = true;
      this.startTime = this.startTime ? now - (this.lastTime - this.startTime) : now;
      this.lastTime = now;
      this.interval = window.setInterval(() => {
        this.lastTime = Date.now();
        this.notify();
      }, 500);
    }
    this.notify();
  }

  pause(): void {
    if (this.isCounting) {
      this._clearInterval();
      this.isCounting = false;
      this.lastTime = Date.now();
      this.notify();
    }
  }

  reset(): void {
    this._clearInterval();
    this.init();
    this.notify();
  }

  init(): void {
    this.interval = 0;
    this.startTime = 0;
    this.lastTime = 0;
    this.isCounting = false;
  }

  destroy(): void {
    this._clearInterval();
  }

  private _clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = 0;
    }
  }

  private notify() {
    this.onChange && this.onChange(this.seconds);
  }
}

export default Stopwatch;
