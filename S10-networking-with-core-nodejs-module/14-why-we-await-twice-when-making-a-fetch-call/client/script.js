const response = await fetch("http://10.142.157.54:4000/");

console.log(response);

const data = await response.text();

console.log(data);

// for await (const chunk of response.body) {
//   console.log(chunk);
// }
