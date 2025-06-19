import { Buffer, constants } from "buffer";

// Buffer.poolSize = 10000;

// Condition for allocUnsafe to use Buffer Pool
// BufferSize < Buffer.poolSize >>> 1

// const a = Buffer.alloc(4294967296);
// const z = Buffer.alloc(4);

// const b = Buffer.allocUnsafe(4095);
// const c = Buffer.allocUnsafe(4095);

const a = Buffer.allocUnsafe(4)
const b = Buffer.allocUnsafeSlow(4)

console.log(a.buffer.byteLength);
console.log(b.buffer.byteLength);

const d = Buffer.from('a'.repeat(constants.MAX_STRING_LENGTH));
// const string = d.toString()

const joinBuffer = Buffer.concat([a, z]);

// b[2] = 97;
// c[0] = 101;

// console.log(a.byteLength);
// console.log(b.byteLength);
// console.log("***************");
// console.log(a.buffer.byteLength);
// console.log(b.buffer.byteLength);
// console.log(b.buffer === c.buffer);
console.log("End");
