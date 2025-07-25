```javascript
import http from "http";

// Create HTTP client request
const clientRequest = http.request();
// Default: PORT 80 and all available IPs if not specified
// Returns a writable stream
// Default method is GET if not specified

// Write data to server
clientRequest.write("Hi From Client");

// Handle server response
clientRequest.on("response", (response) => {
    // Response is a readable stream
    response.on("data", (chunk) => {
        console.log(chunk.toString());
    });
});
```