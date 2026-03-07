## performance.now() in Node.js

Use `performance.now()` for high-resolution, monotonic timestamps (in milliseconds). It's more precise than `Date.now()` and unaffected by system clock adjustments.

### Example

```javascript
const start = performance.now();

// Your code here

const end = performance.now();

console.log(`Elapsed: ${end - start} ms`);
```

### Key Points

- **Precision**: Sub-millisecond accuracy (microseconds)
- **Monotonic**: Only moves forward; safe for benchmarking
- **Availability**: Global in Node.js v16+
