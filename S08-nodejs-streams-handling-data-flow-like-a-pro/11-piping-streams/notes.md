## Piping Streams

- Piping automatically manages backpressure between streams.
- Use `readStream.pipe(writeStream)` to direct data from a readable stream to a writable stream.
- To stop piping, use `readStream.unpipe(writeStream)`.
- The `pipe` and `unpipe` events are emitted on the writable stream (`writeStream`) when these actions occur.
