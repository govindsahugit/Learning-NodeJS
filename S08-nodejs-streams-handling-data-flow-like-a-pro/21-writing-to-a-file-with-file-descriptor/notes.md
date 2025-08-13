## Writing to a File

To write data to a file, ensure the file is opened in write mode:

```js
const fs = require('fs');
const fd = fs.openSync(path, 'w');
```

### Asynchronous Write

```js
fs.write(fd, content, (err, bytesWritten, str) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Bytes written: ${bytesWritten}`);
        console.log(`String written: ${str}`);
    }
});
```

### Synchronous Write

```js
const bytesWritten = fs.writeSync(fd, content);
console.log(`Bytes written: ${bytesWritten}`);
```