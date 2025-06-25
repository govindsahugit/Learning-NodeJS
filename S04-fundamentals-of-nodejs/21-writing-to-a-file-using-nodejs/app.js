import fs from "fs/promises";

fs.writeFile("file-1.txt", "\nAnd I'm learning fs file module")
fs.appendFile("file-1.txt", "\nAnd I'm learning fs file module")
