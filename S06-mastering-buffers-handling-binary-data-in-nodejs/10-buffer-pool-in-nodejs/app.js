import { Buffer, constants } from "buffer";

// console.log(Buffer.poolSize);

// const a = Buffer.alloc(4);
// const b = Buffer.allocUnsafe(4);
// console.log(a);
// console.log(b);
// console.log(a.buffer);
// console.log(b.buffer);
// console.log(a.byteLength);
// console.log(b.byteLength);
// console.log("-------------");
// console.log(a.buffer.byteLength);
// console.log(b.buffer.byteLength);

// ======================================= //

// const a = Buffer.alloc(4);
// const z = Buffer.alloc(4);
// const jointBuffer = Buffer.concat([a, z]);

// const b = Buffer.allocUnsafe(4095);
// const c = Buffer.allocUnsafe(4095);
// const d = Buffer.from("abc");

// b[2] = 97;
// c[0] = 101;

// console.log(a.byteLength);
// console.log(b.byteLength);
// console.log("-------------");
// console.log(a.buffer.byteLength);
// console.log(b.buffer.byteLength);

// ======================================= //

// console.log(constants.MAX_LENGTH);
// const a = Buffer.alloc(constants.MAX_LENGTH);

// ======================================= //

const a = Buffer.allocUnsafe(4);
const b = Buffer.allocUnsafeSlow(4);
console.log(a.buffer.byteLength); // 8192
console.log(b.buffer.byteLength); // 4, it doesn't use buffer pool
