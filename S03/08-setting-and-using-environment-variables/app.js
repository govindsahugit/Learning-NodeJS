const environmentVariables = process.env;

// setInterval(() => {
//   console.log(environmentVariables);
// }, 1000);

// const {exec} = require('child_process');

// exec(`powershell -Command "setx new_variale 'new variable 3' /M"`);

const fs = require("fs");

const fileData = fs.readFileSync("./abc").toString();

console.log(fileData);

const variables = fileData.split("\n");

console.log(variables);

variables.forEach((v) => {
  console.log(v);
  const [key, value] = v.split("=");
  console.log(key, ":", value);
  environmentVariables[key] = value;
});

console.log(environmentVariables);