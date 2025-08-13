# Data Streams (Important)

When a process starts, it has three types of data streams:

- **stdin**: Mostly used to read data.
- **stdout**: Mostly used to write data.
- **stderr**: Mostly used to write errors and warnings.

All of these are **duplex streams** and are accessible via the `process` object.

```js
// Readable Stream
process.stdin

// Writable Streams
process.stdout
process.stderr
```

- `console.log()` uses the `stdout` stream behind the scenes.
- `stderr` is similar to `stdout` but is specifically used for errors and warnings.

**File Descriptors (fd):**

- `stdin`  → 0
- `stdout` → 1
- `stderr` → 2
