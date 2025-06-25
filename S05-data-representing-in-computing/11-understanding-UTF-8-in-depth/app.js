import fs from "node:fs/promises";

const bufferContent = await fs.readFile("text.txt");
let binStr = "";

bufferContent.forEach((hex) => {
  binStr += hex.toString(2) + " ";
});


