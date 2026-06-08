const originalLog = console.log;

console.log = function (...args) {
  originalLog("[patched]", ...args);
};

console.log("Hello", "world!");
