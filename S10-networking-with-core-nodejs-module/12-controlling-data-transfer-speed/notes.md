# Control Data Transfer Speed

When piping data through a socket, it typically operates at maximum speed while handling backpressure automatically.

However, to control or reduce the data transfer speed, manual backpressure handling is required.

This can be achieved by pausing the readStream for specific intervals:

```javascript
readStream.on("data", (chunk) => {
    socket.write(chunk);
    readStream.pause();
    setTimeout(() => {
        readStream.resume();
    }, 10);
});
```

**Note:** Browsers internally implement similar pause/resume mechanisms to handle backpressure effectively.