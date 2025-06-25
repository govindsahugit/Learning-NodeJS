// const a = new ArrayBuffer(4);

// const view = new DataView(a);

// view.setInt8(0, 80);
// view.setInt8(1, 0x50);
// view.setInt8(2, 0o120);
// view.setInt8(3, 0b01010000);

// view.setInt8(0, 80);
// view.setInt8(1, 70);
// view.setInt8(2, 60);
// view.setInt8(3, 50);

// view.setInt8(0, 80);
// view.setInt8(1, -1);
// view.setInt8(2, -2);
// view.setInt8(3, 50);

// view.setInt8(0, 80);
// view.setInt8(1, 255);
// view.setInt8(2, 254);
// view.setInt8(3, 50);

// console.log(view.getInt8(0));
// console.log(view.getInt8(1));
// console.log(view.getInt8(2));
// console.log(view.getInt8(3));

// console.log(view.getInt8(0));
// console.log(view.getInt8(1)); // output -1 signed value
// console.log(view.getUint8(1)); // output 255 Unsigned value
// console.log(view.getInt8(2)); // output -2 signed value
// console.log(view.getUint8(2)); // output 254 Unsigned value
// console.log(view.getInt8(3));

// console.log(a);

const a = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view = new DataView(a);
const b = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view2 = new DataView(b);
const c = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view3 = new DataView(c);
const d = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view4 = new DataView(d);
const e = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view5 = new DataView(e);
const f = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view6 = new DataView(f);
const g = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view7 = new DataView(g);
const h = new ArrayBuffer(1.99 * 1024 * 1024 * 1024);
const view8 = new DataView(h);

for (let i = 0; i < view.byteLength; i++) {
  view.setInt8(i, i + 1);
  view2.setInt8(i, i + 1);
  view3.setInt8(i, i + 1);
  view4.setInt8(i, i + 1);
  view5.setInt8(i, i + 1);
  view6.setInt8(i, i + 1);
  view7.setInt8(i, i + 1);
  view8.setInt8(i, i + 1);
}

setInterval(() => {
  console.log("running...");
}, 2000);
