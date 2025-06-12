const digitList1 = [2, 4, 6, 5];
const num1 = 2 * 1 + 4 * 10 + 6 * 100 + 5 * 1000;
console.log(num1);

const digitList12 = [7, 3, 2];
const num2 = 7 * 1 + 3 * 10 + 2 * 100;
console.log(num2);

function generateNumber(...digitList) {
  let num = 0;
  digitList.map((digit, i) => (num += digit * Math.pow(10, i)));
  return num;
}

console.log(generateNumber(2, 4, 6, 5));
console.log(generateNumber(7, 3, 2));
