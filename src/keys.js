import { EventEmitter } from "events";

class Keys {
  constructor() {
    this.emitter = new EventEmitter();

    document.addEventListener("keydown", e => {
      const presses = this.debounceKey(e.key);

      if (presses >= 3) {
        this.emitter.emit("triplePress", e);
        this.debounceKey();
      }
    });
  }

  set ontriplepress(callback) {
    this.emitter.on("triplePress", callback);
  }

  resetDebounce() {
    this.currentKey = undefined;
    this.countcount = 0;
  }

  debounceKey(key) {
    if (!key) {
      this.count = 0;
    }

    if (key !== this.currentKey) {
      this.count = 0;
      this.currentKey = key;
    }

    this.count += 1;
    const result = this.count;

    if (this.debounce) clearTimeout(this.debounce);
    this.debounce = setTimeout(this.resetDebounce, 200);

    return result;
  }
}

export { Keys };
