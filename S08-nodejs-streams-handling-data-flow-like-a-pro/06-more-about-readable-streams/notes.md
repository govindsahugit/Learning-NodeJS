## More About Readable Streams

- `readStream.setEncoding()` &mdash; Sets the encoding type for the stream.
- `readStream.destroy([error])` &mdash; Destroys the stream and fires the `close` event. If an error is passed, the `error` event is also emitted.

### Key Events

- **open** &mdash; Emitted when the file descriptor is opened. Useful for actions as soon as the file is accessible.
- **ready** &mdash; Emitted when the stream is ready to be read from.
- **readable** &mdash; Indicates data is available to be read with `.read()`.
- **data** &mdash; Emitted when data is available and flowing automatically.
- **end** &mdash; Emitted when there is no more data to read.
- **close** &mdash; Always emitted when the stream is closed or destroyed.
- **error** &mdash; Emitted only if an error occurs.

---

### Flow of Events

```mermaid
graph TD
    A[createReadStream("abc.txt")] --> B(open)
    B --> C(ready)
    C --> D{Reading Flow}
    D --> E[readable<br/>(pull data with .read())]
    D --> F[data<br/>(auto flow via .on('data'))]
    E --> G[end]
    F --> G
    G --> H[close]
    H --> I[Done]
    A -.-> J[error]
    B -.-> J
    C -.-> J
    D -.-> J
    E -.-> J
    F -.-> J
    G -.-> J
```

> At any point, if something goes wrong, the `error` event is emitted.

