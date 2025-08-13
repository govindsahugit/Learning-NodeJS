# Backpressure and Internal Buffer of Writable Streams

- **Read speed** of hard disks and SSDs is generally faster than their **write speed**.
- `writeStream.writableLength`: Indicates how much data is currently buffered for writing.
- The internal buffer can hold more data than the `highWaterMark` value.
- `writeStream.write()` returns a boolean:
    - `true` if `writableLength` is less than or equal to `highWaterMark`
    - `false` if the buffer exceeds `highWaterMark`
- `writeStream.on("drain")`: This event is emitted when the buffer is emptied and the stream is ready for more data.
- **Backpressure** occurs when a writable stream cannot process incoming data as quickly as it is received.

## Why Does Backpressure Happen?

- Writable streams have an internal buffer.
- If you write data faster than it can be processed, the buffer fills up.
- Once full, the stream slows down or pauses incoming writes.
- You must wait for the `"drain"` event before writing more data to avoid overwhelming the stream.
