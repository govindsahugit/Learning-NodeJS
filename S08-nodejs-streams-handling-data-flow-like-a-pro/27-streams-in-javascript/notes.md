```js
const input = document.getElementById("input");
// Target the file input element.

const decoder = new TextDecoder();
// Create a TextDecoder instance.

input.addEventListener("change", async () => {
  const file = input.files[0]; // Get the selected file.
  const readStream = file.stream(); // Get a readable stream from the file.
  const reader = readStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    // 'done' is true when the stream is finished.
    // 'value' is a Uint8Array containing the chunk.
    if (done) break;
    console.log(decoder.decode(value));
    // Decode and log the chunk.
  }

  // Alternative: using for-await-of loop with the stream
  for await (const chunk of readStream) {
    console.log(chunk);
  }
});

// Note: When using fetch, response.body is a readable stream.
// You can use a for-await-of loop to read chunked data from it.
```