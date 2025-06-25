const fs = require("fs");

const text = fs.readFileSync(
  "C:\\Users\\Govind Sahu\\OneDrive\\Desktop\\text.txt"
);
console.log(text.toString());
console.log(globalThis);
