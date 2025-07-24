const response = await fetch("http://192.168.1.10:4000/");

response.headers.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
