Reading file with descriptor.

    fs.read(fd, (err, bytesRead, bufferData) => {
        console.log(err)
        console.log(bytesRead)
        console.log(bufferData)
        console.log(bufferData.byteLength) // 16 KB (default)
    })

    we can also pass an option of buffer if we want a limited buffer:

    fs.read(fd, { buffer: Buffer.alloc(10) },
    (err, bytesRead, bufferData) => {
        console.log(err)
        console.log(bytesRead)
        console.log(bufferData)
        console.log(bufferData.byteLength) // 16 KB (default)
    })

    position property to tell the position from where we want to read.

    length for reading from position till given length

    Can explore more options on Documentation