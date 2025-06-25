import { Buffer, constants } from "buffer";
import fs from "fs/promises";

const nodeBuffer = Buffer.from("Hello World!", 'utf-8');
// const nodeBuffer = Buffer.alloc(8);

// Methods //
// nodeBuffer.write("abcdef");
// console.log(nodeBuffer.toString());
// console.log(nodeBuffer.toJSON());
// console.log(nodeBuffer.slice(5, 8).toString()); // Deprecated
// console.log(nodeBuffer);
// console.log(nodeBuffer.subarray(2));
// console.log(nodeBuffer.subarray(2).toString());
// nodeBuffer.copy(nodeBuffer2, 0, 0, 5);
// console.log(nodeBuffer.includes("He", 5, 'utf-16le'));
// nodeBuffer.fill(98)
// console.log(nodeBuffer.readInt8(1));
// console.log(nodeBuffer.readInt16BE(1));
// console.log(nodeBuffer.writeInt8(0x65));
// console.log(nodeBuffer.writeInt16LE(0x65, 0));
// console.log(nodeBuffer.writeInt16LE(0x67, 2));
// console.log(nodeBuffer.writeInt16BE(0x65, 0));
// console.log(nodeBuffer.writeInt16BE(0x67, 2));
// console.log(nodeBuffer.at(2));
// console.log(nodeBuffer.swap16());

// Properties //
console.log(nodeBuffer.buffer);
console.log(nodeBuffer.byteLength);
console.log(nodeBuffer.byteOffset);
console.log(nodeBuffer.length);
