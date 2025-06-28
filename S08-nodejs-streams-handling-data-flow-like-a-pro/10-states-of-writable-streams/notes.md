States of Writable Streams

    Writable(Initial) State -> Means we can write.
        writeStream.writable() return true if we can write, else false
        If the stream is ended we cannot write.

    Corked State
        writeStream.writableCorked() -> 0 means not corked , > 0 means corked
        writeStream.cork() -> Means data will load but cannot write
        writeStream.uncork() -> makes it to uncorked(Normal) state, and loaded data will be written. 

    Ended State
        It means the stream has got the signal to be ended, but does not guarantee that all data is flushed.
        writeStream.writeableEnded.
    
    Finished State
        This tell that the data has fully flushed to the destination.
        It takes some milliseconds after the ended State.

        we can check it through:
            writeStream.writableFinished
            writeStream.writableEnded
    
    It also has errored state and destory method