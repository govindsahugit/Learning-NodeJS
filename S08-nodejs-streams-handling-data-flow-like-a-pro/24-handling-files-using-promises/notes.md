# Handling Files Using Promises in Node.js

```javascript
// Import the promises version of fs module
import fs from "fs/promises";

// Open file and get file handle
const fileHandle = await fs.open("time.txt", mode);
// Returns an object with methods and properties for file operations

// Read from file (no file descriptor needed)
const result = await fileHandle.read(options);
// Returns { bytesRead: number, buffer: Buffer }

// Write to file
const written = await fileHandle.write(content, options);
// Returns { bytesWritten: number, buffer: Buffer }

// Always close the file when done
await fileHandle.close();
```

Key points:
- Uses modern promise-based API
- Provides direct file operations through fileHandle
- Recommended to always close files after use 
- More structured error handling with try/catch