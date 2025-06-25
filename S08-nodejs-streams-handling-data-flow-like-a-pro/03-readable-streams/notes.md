Problems we face without using Streams

    Using Buffer we cannot load file larger than 2 GiB
    Large file reading/writing occupy space in RAM and increases CPU usage.

Readable Streams

    for creating readStream we have to use normal fs module instead of promises. Cuz it give you streams method directly.

    Eg.
    const stream = fs.createReadStream("./ss.jpg", { highWaterMark: 20 * 1024 });

    fs.createReadStream() takes path and optional options object for how much chunk you need at a time.

    It returns a object which has some methods for listening the events. 

    Eg.

    stream.on("data", (chunk) => {
        console.log(chunk.byteLength);
    });

    stream.on("end", () => console.log("Ended"));