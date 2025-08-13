## Why Are Streams So Fast?

- **Streams** open a file once, load data into an internal buffer (RAM), and write it efficiently in chunks. After writing, the file is closed.
- In contrast, methods like `appendFileSync` and `writeFileSync` open and close the file for every write operation, writing directly to disk each time.
- When writing large amounts of data (e.g., looping through 100,000 numbers), streams are much faster because they minimize file open/close operations and use memory buffers for efficient data handling.
