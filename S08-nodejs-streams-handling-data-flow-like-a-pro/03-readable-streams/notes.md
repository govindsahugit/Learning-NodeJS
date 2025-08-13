## Problems Without Using Streams

- Using Buffers, you cannot load files larger than 2 GiB.
- Reading or writing large files occupies significant RAM and increases CPU usage.

## Readable Streams

- To create a readable stream, use the standard `fs` module (not the promises API), as it provides stream methods directly.

**Example:**

```js
const fs = require('fs');
const stream = fs.createReadStream('./ss.jpg', { highWaterMark: 20 * 1024 });
```

- `fs.createReadStream()` takes a file path and an optional options object (e.g., to specify chunk size).
- It returns a stream object with methods for listening to events.

**Example:**

```js
stream.on('data', (chunk) => {
    console.log(chunk.byteLength);
});

stream.on('end', () => {
    console.log('Ended');
});
```