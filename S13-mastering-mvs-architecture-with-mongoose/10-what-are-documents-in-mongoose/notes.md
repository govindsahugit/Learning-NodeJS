# What is a Mongoose Document?

## A document is an instance of a Mongoose model, representing one record in the MongoDB collection
It is not a plain object — it inherits from Mongoose's Document class.

Comes with built-in methods, schema validation, and middleware support.

## Key Characteristics
- Created using `new Model({...})` or retrieved via query
- Can interact with MongoDB using `.save()`, `.deleteOne()`, `.updateOne()`, etc.
- Supports validation, middleware, instance methods, and change tracking (`.isModified()`)