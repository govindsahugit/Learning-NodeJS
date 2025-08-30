# Mongoose Query Behavior

## Connection Dependency
No query is executed until Mongoose is connected to the database.

Queries will be queued internally and executed once the connection is established.

```javascript
mongoose.connect(uri); // Only after successful connection, queries will run
```

## Shared Connection
A single Mongoose connection is reused across all files/modules.

This means you typically connect once (e.g., in index.js or db.js) and then import the models in other files without reconnecting.

```javascript
// db.js
mongoose.connect(uri);

// userModel.js
const User = mongoose.model("User", userSchema); // uses the same connection
```