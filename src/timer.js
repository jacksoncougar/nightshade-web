import { EventEmitter } from "events";

class Timer {
  constructor() {
    this.emitter = new EventEmitter();
    this.running = false;
  }

  set ontick(callback) {
    this.emitter.on("tick", callback);
  }

  get isRunning() {
    return this.running;
  }

  set onexpired(callback) {
    this.emitter.on("expired", callback);
  }

  update() {
    const moment = this.startTime - Date.now();

    let minutes = Math.floor(moment / 1000 / 60);
    let seconds = Math.floor((moment / 1000) % 60);

    if (moment <= 0) {
      clearInterval(this.interval);
      this.running = false;
      minutes = 0;
      seconds = 0;
      this.emitter.emit("expired");
    }

    this.emitter.emit("tick", minutes, seconds);
  }

  start(time) {
    this.running = true;
    const ms = time * 1000 * 60;
    this.startTime = Date.now() + ms;
    this.interval = setInterval(() => {
      this.update();
    }, 100);
    this.update();

    return new Promise(
      resolve => {
        this.emitter.once("expired", resolve);
      },
      reject => {
        this.emitter.once("cancel", reject);
      }
    );
  }

  cancel() {}
}

export { Timer };
