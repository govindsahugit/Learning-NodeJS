function sum(...num) {
  return num.reduce((acc, curr) => acc + curr);
}

module.exports = sum;
