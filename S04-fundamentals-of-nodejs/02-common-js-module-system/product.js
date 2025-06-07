function product(...num) {
  return num.reduce((acc, crr) => acc * crr);
}

module.exports = product;