# What is a Mongoose Query?

A Mongoose query is an object representing a database operation (e.g., find, update, delete). It allows you to build the query before executing it.

## Lazy Execution

A query doesn't run until you:

- await it
- Call .then()
- Use .exec()

```javascript
const query = User.find({ age: { $gt: 18 } }); // not yet executed
const result = await query; // now it's executed
```

## Chaining

```javascript
await User.find({ age: { $gte: 18 } })
  .select("name email")
  .limit(10)
  .sort({ name: 1 });
```
