More About Readable Streams

    readStream.setEncoding() -> Sets Encoding type
    readStream.destroy() -> Destorys the streams and fire the close event.
    we can pass error in destroy method. If error is passed then only it will fire the error event.

    Events:
        close -> Always fires at the end
        end -> Fires at the end of the stream
        error -> Only fires when an error comes
        open -> Fires  when the file descriptor is opened, Useful if you want to do something as soon as the file is accessible
        ready -> Fires when the stream is ready to be read from

// ================================================ //

Flow of Events

    createReadStream("abc.txt")
        ↓
    'open' (file is accessible)
        ↓
    'ready' (buffer filled, ready to read)
        ↓
    ┌─────────────┐
    │ Reading Flow│
    └─────────────┘
        ↓
    'readable' (pull data with .read()) OR
    'data'     (auto flow via .on('data'))
        ↓
    (pause/resume events optional)
        ↓
    'end' (no more data)
        ↓
    'close' (stream destroyed)

    At any time something goes wrong it fires error event.

Reply
