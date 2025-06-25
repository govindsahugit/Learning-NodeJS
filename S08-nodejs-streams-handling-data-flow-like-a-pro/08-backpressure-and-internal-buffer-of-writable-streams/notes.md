Backpressure and Internal Buffer of writeable Streams

    Read speed is fast of HardDisks and SSD as compared to write speed.
    writeStream.writableLength -> How much data is loaded on it.

    It can load data more than HighWaterMark value.

    writeStream.write() return boolean value. True if it has writableLength lessthan/equal to HighWaterMark value, else false.

    writeStream.on("drain") -> This event fires when the data is written.

    Backpressure occurs when a Writable stream cannot process incoming data as fast as it’s being written to it.

    Why Does Backpressure Happen?
        Writable streams have an internal buffer. If you write too much data too quickly.
        The buffer fills up.
        The stream pauses or slows down incoming writes.
        You must wait before writing more.