# States of Writable Streams

Writable streams in Node.js go through several states during their lifecycle:

## 1. Writable (Initial) State
- The stream is ready to accept data.
- `writeStream.writable` returns `true` if writing is possible.
- If the stream is ended, writing is no longer allowed.

## 2. Corked State
- Data written is buffered, not immediately flushed.
- `writeStream.writableCorked` returns `0` if not corked, greater than `0` if corked.
- Use `writeStream.cork()` to enter the corked state.
- Use `writeStream.uncork()` to flush buffered data and return to normal state.

## 3. Ended State
- The stream has received the signal to end, but data may still be buffered.
- `writeStream.writableEnded` is `true` in this state.

## 4. Finished State
- All data has been flushed to the destination.
- There may be a short delay after the ended state before reaching finished.
- Check with:
    - `writeStream.writableFinished`
    - `writeStream.writableEnded`

## 5. Errored State and Destroy Method
- The stream can enter an errored state if an error occurs.
- Use the `destroy()` method to forcibly close the stream.
