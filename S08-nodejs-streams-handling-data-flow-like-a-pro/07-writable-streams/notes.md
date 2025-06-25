Writeable Streams

    fs.createWriteStream(path, {options});
    It will create the file if not exist, Similar to writeFile Method.
    By default write value, technically highWaterMark value is 16 KB(16384 Bytes).

    writeStream.writableHighWaterMark -> gives highWaterMark value.

    writeStream.write() -> 1st Write() will wipeout all the data next write()'s will Append the data