Different modes of opening files

    by default file is opened in read mode
    const fd = fs.openSync(path, mode);

    modes:
        r - read
        w - write
        a - append
        mode+ - mode operation and read/write