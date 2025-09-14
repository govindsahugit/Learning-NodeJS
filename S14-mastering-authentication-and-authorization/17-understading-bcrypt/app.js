import bcrypt from "bcrypt";

// const salt = await bcrypt.genSalt(10);
// console.log(salt);

// const hashedPassword = await bcrypt.hash("password", 10);
// console.log(hashedPassword);

const storedPassword =
  "$2b$10$cdlbLnxn7/GRFm9XYM4vJe6Y5KCX6vl0hEW0ju0GNZMej4jouaoO.";

// const salt = storedPassword.substring(0, 29);

// const password = await bcrypt.hash("password", salt);
// console.log(password === storedPassword);
// console.log(storedPassword);
// console.log(password);

const password = await bcrypt.compare("password", storedPassword);
console.log(password); // boolean
