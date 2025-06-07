function sum(...nums) {
  return nums.reduce((curr, acc) => curr + acc);
}

function product(...nums) {
  return nums.reduce((curr, acc) => curr * acc);
}

module.exports = {
  sum,
  product,
};

console.log(module);

// let exports = module.exports;

// exports.sum = sum;
// exports.product = product;

// console.log(module.exports === exports);

// module.exports.sum = sum
// module.exports.product = product

// console.log(module.exports);
