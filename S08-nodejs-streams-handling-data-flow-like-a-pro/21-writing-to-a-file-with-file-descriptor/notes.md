Writing to a file

    for writing data we should make sure the file is open in write mode
    const fd = openSync(path, "w");

    fs.write(fd, content, (err, bytesWritten, str) => {
        console.log(err)
        console.log(bytesWritten)
        console.log(str)
    } )

    // Sync function
    const bytesWritten = fs.writeSync(fd, content)