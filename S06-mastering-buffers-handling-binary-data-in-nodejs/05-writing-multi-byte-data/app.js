const a = new ArrayBuffer(4);
const view = new DataView(a);

// view.setInt16(0, 259);
// console.log(view.getInt16(0));

view.setInt16(2, 513);
view.setInt16(0, 259, true);

// view.setInt16(0, 259, true);
// view.setInt16(2, 513);
console.log(a);
// console.log(view.getInt16(0, true));
// console.log(view.getInt16(1));
