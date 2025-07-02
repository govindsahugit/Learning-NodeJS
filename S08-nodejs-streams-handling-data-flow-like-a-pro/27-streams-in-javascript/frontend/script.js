const input = document.querySelector("input");

// input.addEventListener("change", async () => {
//   const file = input.files[0];
//   const str = await file.text();
//   console.log(str);
// });

const decoder = new TextDecoder();

// input.addEventListener("change", async () => {
//   const file = input.files[0];
//   const readStream = file.stream();
//   const reader = readStream.getReader();
//   const result1 = await reader.read();
//   console.log(decoder.decode(result1.value));
//   const result2 = await reader.read();
//   console.log(decoder.decode(result2.value));
//   const result3 = await reader.read();
//   console.log(decoder.decode(result3.value));
//   const result4 = await reader.read();
//   console.log(decoder.decode(result4.value));
//   const result5 = await reader.read();
//   console.log(decoder.decode(result5.value));
//   const result6 = await reader.read();
//   console.log(decoder.decode(result6.value));
//   const result7 = await reader.read();
//   console.log(decoder.decode(result7.value));
// });

// input.addEventListener("change", async () => {
//   const file = input.files[0];
//   const readStream = file.stream();
//   const reader = readStream.getReader();

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;
//     console.log(decoder.decode(value));
//   }
// });

input.addEventListener("change", async () => {
  const file = input.files[0];
  const readStream = file.stream();
  // const reader = readStream.getReader();

  for await (const chunk of readStream) {
    console.log(decoder.decode(chunk));
  }
});

// ============================================== //
console.time();

const response = await fetch("http://localhost:4000/");

for await (const chunk of response.body) {
  console.log(decoder.decode(chunk));
}

console.timeEnd();
