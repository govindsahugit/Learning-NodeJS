Piping Streams

    Piping handles the backpressure automatically.

    readStream.pipe(writeStream)
    readStream.unpipe(writeStream)

    when we do this pipe and unpipe events fire on writeStream only.