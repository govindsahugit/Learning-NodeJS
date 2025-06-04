let time = 6;
console.log(
  "Hii, this is Govind Sahu. Your device is going to hacked in 5 seconds."
);
const interval = setInterval(() => {
  time--;
  console.log(time);
  if (time === 0) {
    clearInterval(interval);
    console.log("Your device is hacked successfully.");
    while (true) {
      console.log("Hacked by Govind Sahu");
    }
  }
}, 1000);
