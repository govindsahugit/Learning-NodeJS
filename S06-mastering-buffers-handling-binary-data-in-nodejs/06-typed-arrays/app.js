// const a = new ArrayBuffer(4);

// const uint8Array = new Uint8Array(a);
// const uint16Array = new Uint16Array(a);
// const uint32Array = new Uint32Array(a);

// uint8Array[2] = 0xae;
// uint16Array[0] = 0xcdef;

// console.log(uint8Array);
// console.log(uint16Array);
// console.log(uint32Array);

// console.log(uint8Array[2]);
// console.log(uint16Array[0]);

// ============= we will go with Uint8Array ===================== //

// const a = new ArrayBuffer(4);
// const uint8Array = new Uint8Array(a);

// const uint8Array = new Uint8Array(4);
// uint8Array[0] = 0xab;
// uint8Array[2] = 0xcd;
// uint8Array[3] = 0xef;
// uint8Array[4] = 0xaf;

// const uint8Array = new Uint8Array([0xab, 0xcd, 0xef, 0xaf]);

// const uint8Array = new Uint8Array(1.99 * 1024 * 1024 * 1024);
// for (let i = 0; i < uint8Array.length; i++) {
//   uint8Array[i] = i + 1;
// }

// const uint8Array = new Uint8Array(1.99 * 1024 * 1024 * 1024).fill(0xff);

const a = new ArrayBuffer(4, { maxByteLength: 16 });
console.log(a);
a.resize(8);
console.log(a);
const b = a.transfer();
console.log(a);
console.log(b);
