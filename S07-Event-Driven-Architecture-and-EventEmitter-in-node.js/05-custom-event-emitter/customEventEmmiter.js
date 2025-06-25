class myEventEmitter {
  constructor() {
    this._events = {};
    this.params = [];
  }
  on(eventName, handler) {
    if (this._events[eventName]) {
      this._events[eventName].push(handler);
    } else {
      this._events[eventName] = [handler];
    }
  }
  emit(eventName, ...args) {
    this._events[eventName]?.forEach((event) => {
      event(...args);
    });
  }
}

const emitter = new myEventEmitter();

emitter.on("x", (a, b) => {
  console.log("x event 1");
  console.log(a, b);
});
emitter.on("x", (a, b) => {
  console.log("x event 2");
  console.log(a, b);
});

emitter.emit("x", 1, 2);
