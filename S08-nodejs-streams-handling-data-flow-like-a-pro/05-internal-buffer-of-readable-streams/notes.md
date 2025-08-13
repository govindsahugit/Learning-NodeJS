## Internal Buffer of Readable Streams

The internal buffer of a readable stream temporarily stores the data chunks received until the stream ends.

- The internal buffer updates with each incoming chunk.
- Its size is determined by the `highWaterMark` property.

Example:

```js
stream.on("readable", () => {
    console.log(stream.readableLength); // Bytes available in the buffer
    console.log(stream.read());         // Reads data from the buffer
    console.log(stream.readableLength); // Remaining bytes after reading
});
```

In this example:
- The `readable` event is emitted when data is available to read.
- `stream.readableLength` shows the number of bytes currently buffered.
- `stream.read()` reads data from the buffer.
- After reading, `stream.readableLength` reflects the remaining bytes.