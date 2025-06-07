function product(...num) {
  return num.reduce((acc, crr) => acc * crr);
}

function sum(...num) {
  return num.reduce((acc, curr) => acc + curr);
}

console.log(module.exports);

// module.exports = {
//   sum,
//   product,
// };

// module.exports.sum = sum;
// module.exports.product = product;

exports.sum = sum;
exports.product = product;

console.log(module.exports);
