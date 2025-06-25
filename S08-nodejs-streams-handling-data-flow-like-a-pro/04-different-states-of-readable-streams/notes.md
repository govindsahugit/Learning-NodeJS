ifferent States of Readable Streams

    Initial -> Stream is initialed
    Flowing -> Stream is flowing, working
    Paused -> Stream is Stopped
    Ended  -> Stream is Ended

    Common Properties:
        readableFlowing
        readableEnded

    Common Method:
        isPaused()
        pause()
        resume()

    we aslo have events names like resume, pasue, etc.
    Bydefault resume event fire when data event is fired.
    Note : When stream is ended(end event) then also it remains true.