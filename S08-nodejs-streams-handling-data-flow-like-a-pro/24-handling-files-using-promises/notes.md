Handling file using promisses
    
    import fs from "fs/promises";

    const fileHandle = await fs.open("time.txt", mode);

    // return a object with methods and properties

    // Here we can directly perform read, write operation without passing file descriptor

    const r = await fileHandle.read(options);
    // Return an object with bytesRead and Buffer 

    const w = await fileHandle.write(content, options)
    // Return an object with bytesWritten and Buffer 

    fileHandle.close();
    // Close the file