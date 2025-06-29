File Descriptor ?

    File Descriptor is a non negative integer.
    (0 or positive)

    It represented as address of open file.

    // Callback
    fs.open(path, (err, fd) => {
        console.log(fd);
    });

    // Synchronous
    const fd1 = openSync(path);

    This will show the file Descriptor of opened file.

    It will always start from 3, because:
        0 stdin
        1 stdout
        2 stderr

Reply