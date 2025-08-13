# Different States of Readable Streams

A readable stream in Node.js can be in one of several states:

- **Initial**: Stream is initialized.
- **Flowing**: Stream is actively emitting data.
- **Paused**: Stream is temporarily stopped and not emitting data.
- **Ended**: Stream has finished emitting data.

## Common Properties

- `readableFlowing`: Indicates if the stream is in flowing mode.
- `readableEnded`: Indicates if the stream has ended.

## Common Methods

- `isPaused()`: Checks if the stream is paused.
- `pause()`: Pauses the stream.
- `resume()`: Resumes the stream.

## Events

- Events like `resume`, `pause`, and others are available.
- By default, the `resume` event is triggered when the `data` event is fired.
- **Note:** When the stream has ended (after the `end` event), `readableEnded` remains `true`.
