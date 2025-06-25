import { Buffer, constants } from "buffer";
import fs from "fs/promises";

// ===================================================== //

// const nodeBuffer1 = Buffer.alloc(8);
// nodeBuffer1[0] = 97;
// nodeBuffer1[2] = 0;
// nodeBuffer1[7] = 98;

// console.log(nodeBuffer1);
// console.log(nodeBuffer1.toString());

// const decoder = new TextDecoder();
// console.log(decoder.decode(nodeBuffer1));

// =======================READING========================== //

// const nodeBuffer = Buffer.from("Hello World!", "utf-16le");
// console.log(nodeBuffer);
// fs.writeFile("test.txt", nodeBuffer);
// console.log(nodeBuffer.toString("utf-8"));

// =======================WRITING========================== //

const nodeBuffer1 = Buffer.alloc(8);
const nodeBuffer2 = Buffer.from("Hello World!");
// const nodeBuffer3 = Buffer.from("");
nodeBuffer1.write("abcd", "utf8");

nodeBuffer2.copy(nodeBuffer1, 2, 0, 5);

console.log(nodeBuffer1.toString());
// console.log(nodeBuffer1.toJSON());
