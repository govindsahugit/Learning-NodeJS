// "use strict"
// a = 5; // error: a is not defined when we use 'use strict' string in module or function
// console.log(a);

const b = require("./math")

console.log(__dirname);
console.log(__filename);