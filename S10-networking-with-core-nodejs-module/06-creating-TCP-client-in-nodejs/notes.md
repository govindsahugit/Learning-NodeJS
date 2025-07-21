# TCP Client

A TCP client is a program that connects to a TCP server using Node.js's `net` module. Here are the key points:

- Uses `net.connect()` or `net.createConnection()` to establish connection
- Requires server's IP address and port number to connect
- Can send data using `write()` method
- Can receive data through 'data' event
- Should handle connection errors appropriately
- Needs to close connection when done using `end()`

Example:
```javascript
const net = require('net');
const client = net.createConnection({ port: 3000 }, () => {
    console.log('Connected to server!');
});
```