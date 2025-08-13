## File Descriptor

A **file descriptor** is a non-negative integer (0 or positive) that acts as a reference to an open file in the operating system.

- It serves as an address or handle for accessing the open file.

### Example Usage

**Asynchronous:**
```js
fs.open(path, (err, fd) => {
    console.log(fd); // fd is the file descriptor
});
```

**Synchronous:**
```js
const fd1 = fs.openSync(path);
console.log(fd1); // fd1 is the file descriptor
```

These methods return the file descriptor of the opened file.

### Standard File Descriptors

File descriptors start from 3 because the first three are reserved:

- `0` — Standard Input (`stdin`)
- `1` — Standard Output (`stdout`)
- `2` — Standard Error (`stderr`)
- `3` and above — User-opened files
