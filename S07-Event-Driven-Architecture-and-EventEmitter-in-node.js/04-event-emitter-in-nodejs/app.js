import EventEmitter from "events";

const emitter = new EventEmitter();
console.log(emitter);

emitter.on("abc", (e) => {
  console.log("Event 1");
});
emitter.on("abc", (e) => {
  console.log("Event 2");
});
// emitter.emit("abc");

console.log(emitter);
