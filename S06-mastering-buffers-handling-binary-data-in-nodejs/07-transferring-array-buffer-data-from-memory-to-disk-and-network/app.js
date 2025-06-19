import fs from "fs/promises";

const uint8Array = new Uint8Array(6);

uint8Array[0] = 0x47;
uint8Array[1] = 0x6f;
uint8Array[2] = 0x76;
uint8Array[3] = 0x69;
uint8Array[4] = 0x6e;
uint8Array[5] = 0x64;

// const decoder = new TextDecoder("utf-8");
// console.log(decoder.decode(uint8Array));
// fs.writeFile("buffer-text.txt", uint8Array);

const view = new DataView(uint8Array.buffer);
fs.writeFile("buffer-text.txt", view);
