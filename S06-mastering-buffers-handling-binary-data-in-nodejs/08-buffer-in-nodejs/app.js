import { Buffer } from "buffer";

// const uint8Array = new Uint8Array(4);
// console.log(uint8Array.buffer);

// const nodeBuffer = new Buffer(4);  //deprecated
// console.log(nodeBuffer);

// const nodeBuffer = Buffer.alloc(4);
// console.log(nodeBuffer);

// const a = new ArrayBuffer(4);
// const nodeBuffer = Buffer.from(a);
// console.log(nodeBuffer.buffer);

// ======================= TASK =========================== //

// const a = new ArrayBuffer(4);

// const nodeBuffer = Buffer.from(a);
// const uint8Array = new Uint8Array(a);

// uint8Array[0] = 97;
// uint8Array[1] = 98;
// uint8Array[2] = 99;
// uint8Array[3] = 100;

// // console.log(nodeBuffer.buffer === uint8Array.buffer);
// console.log(uint8Array.toString()); // 97,98,99,100
// console.log(nodeBuffer.toString()); // abcd

// ================================================ //

const nodeBuffer1 = Buffer.alloc(4);
const nodeBuffer2 = Buffer.from([97, 98, 99, 100]);

console.log(nodeBuffer1.buffer.byteLength); // 4
console.log(nodeBuffer2.byteLength); // 4
console.log(nodeBuffer2.buffer.byteLength); //8192
