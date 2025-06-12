const octalNum1 = 0o12;
console.log(octalNum1);

const octalNum2 = 0o237;
console.log(octalNum2);

const num1 = 7428933;
const octalNumOfNum1 = parseInt(num1, 8);

function generateNumber(digitList, redix = 10) {
  let num = 0;
  digitList.map((digit, i) => (num += digit * Math.pow(redix, i)));
  return num;
}

console.log(generateNumber([2, 4, 6, 5], 8));
console.log(generateNumber([7, 3, 2], 8));
