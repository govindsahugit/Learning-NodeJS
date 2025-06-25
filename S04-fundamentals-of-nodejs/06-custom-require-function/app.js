const b = loadModule("./math.js");
const { sum } = loadModule("./sum.js");

// const vm = require("vm");
// vm.runInNewContext("var a = 6");

console.log(sum(1, 2, 3, 4));

function loadModule(path) {
  const fs = require("fs");
    const vm = require("vm");
  const fileContent = fs.readFileSync(path).toString();
  //   console.log(fileContent);
  return (function (send) {
    // module code goes here
    eval(fileContent); // or
    vm.runInNewContext(fileContent, { send, loadModule, console });

    return send;
  })({});
}
