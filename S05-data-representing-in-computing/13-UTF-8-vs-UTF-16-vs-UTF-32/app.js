import fs from "node:fs/promises";

const bufferContent = await fs.readFile("text.txt");

const bufferToString = (buffer) => {
  let str = "";
  str += buffer.map((s) => s);
  return str;
};

bufferToString(bufferContent);
