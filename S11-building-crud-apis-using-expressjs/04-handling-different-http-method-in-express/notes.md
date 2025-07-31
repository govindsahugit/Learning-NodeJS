## HTTP Methods in Express

Express.js provides specific methods to handle different HTTP requests:

```javascript
// Main HTTP methods and their uses
app.get(path, handler)      // GET: Retrieve data
app.post(path, handler)     // POST: Create new data
app.put(path, handler)      // PUT: Replace entire resource
app.patch(path, handler)    // PATCH: Partial modification
app.delete(path, handler)   // DELETE: Remove data
app.all(path, handler)      // ALL: Handle any HTTP method
```

Each method takes a path and a handler function that processes the request.