import fs from "fs/promises";

const a = await fs.readFile("file.txt");
console.log(a.toString());
