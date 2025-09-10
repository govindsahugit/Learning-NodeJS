# Hashing using Crypto Module

## Use crypto.createHash(algorithm) to create a hash (e.g., 'sha256')

## Use .update(data) to add data for hashing

Accepted types: string, Buffer, TypedArray, DataView

You can also chain multiple .update() calls to combine data.

## Use .digest(format) to get the final hashed output ('hex', 'base64', etc.)

Once .digest() is called, the hash object can't be reused.

## Example

```javascript
const crypto = require("crypto");

const hash = crypto
  .createHash("sha256")
  .update("hello")
  .update("world")
  .digest("hex");
```
