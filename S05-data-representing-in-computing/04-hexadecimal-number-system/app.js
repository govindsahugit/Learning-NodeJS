const hexNum1 = 0x843;
// console.log(hexNum1); // output 2115

const hexNum1toStr = hexNum1.toString(16); // output 843
// console.log(hexNum1toStr);

// console.log(parseInt(hexNum1toStr, 16)); //output 2115

const hexNum2 = 0x45a; // or 0x45A
// console.log(hexNum2); //output 1114

const hexNum2toStr = hexNum2.toString(16);
// console.log(hexNum2toStr); // output 45a

// console.log(parseInt(hexNum2toStr, 16));

function generateNumber(digitList, redix = 10) {
  let num = 0;
  digitList.map((digit, i) => (num += digit * Math.pow(redix, i)));
  if (!num) {
    num = 0;
    let val = 0;
    digitList.map((digit, i) => {
      if (digit === "a" || digit === "A") val = 10;
      else if (digit === "b" || digit === "B") val = 11;
      else if (digit === "c" || digit === "C") val = 12;
      else if (digit === "d" || digit === "D") val = 13;
      else if (digit === "e" || digit === "E") val = 14;
      else if (digit === "f" || digit === "F") val = 15;
      else val = digit;
      num += val * Math.pow(redix, i);
    });
    return num;
  }
  return num;
}

console.log(generateNumber([4, 5, "a"], 16));
console.log(generateNumber(["f", "f", "f"], 16));
console.log(generateNumber([2, 4, 6, 5], 8));
console.log(generateNumber([7, 3, 2], 8));
