```js
import fs from "fs/promises";

// To use streams with promises, first open the files in the desired mode
const fileHandle1 = await fs.open("time.txt");
const fileHandle2 = await fs.open("abc.txt", "w+");

// Create readable and writable streams from the file handles
const readStream = fileHandle1.createReadStream();
const writeStream = fileHandle2.createWriteStream();

// Pipe data from the read stream to the write stream
readStream.pipe(writeStream);

// Close both file handles when writing is done
writeStream.on("close", async () => {
  await fileHandle1.close();
  await fileHandle2.close();
  console.log("Files closed");
});
```
