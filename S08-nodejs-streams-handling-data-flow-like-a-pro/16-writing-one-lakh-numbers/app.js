import fs, { createWriteStream } from "fs";

console.time();

// for (let i = 1; i <= 5000; i++) {
//   if (i === 1)
//     fs.writeFile("nums.txt", `${i}, `, (err) => {
//       if (err) console.log(err);
//     });
//   else
//     fs.appendFile("nums.txt", `${i}, `, (err) => {
//       if (err) console.log(err);
//       if (i === 5000) console.timeEnd();
//     });
// }

// for (let i = 1; i <= 100000; i++) {
//   if (i === 1) fs.writeFileSync("nums.txt", `${i}, `);
//   else fs.appendFileSync("nums.txt", `${i}, `);
//   if (i === 100000) console.timeEnd();
// }

const writeStreams = createWriteStream("streamnums.txt");
for (let i = 1; i <= 100000; i++) {
  writeStreams.write(`${i}, `);
}
writeStreams.end();
writeStreams.on("finish", () => {
  console.timeEnd();
});
// console.timeEnd();
