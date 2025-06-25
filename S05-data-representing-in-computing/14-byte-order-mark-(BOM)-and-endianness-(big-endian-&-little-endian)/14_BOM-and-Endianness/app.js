import fs from "fs/promises";

const contentBuffer = await fs.readFile("text.txt");

console.log(contentBuffer.toString());