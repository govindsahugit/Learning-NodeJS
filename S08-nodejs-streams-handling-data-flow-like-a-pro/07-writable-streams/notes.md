## Writable Streams

- `fs.createWriteStream(path, { options })`  
    Creates a writable stream to the specified file. If the file does not exist, it will be created. This is similar to the `writeFile` method.

- By default, the writable stream's `highWaterMark` (buffer size) is 16 KB (16,384 bytes).

- `writeStream.writableHighWaterMark`  
    Returns the current `highWaterMark` value for the stream.

- `writeStream.write()`  
    The first call to `write()` will overwrite the file's contents. Subsequent calls will append data to the file.