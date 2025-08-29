# Models and Mongoose (ODM for MongoDB)

## What is Mongoose?
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It allows you to define schemas and interact with MongoDB using models.

## Connection
```javascript
mongoose.connect(uri);
```

## Defining a Model
```javascript
const Model = mongoose.model("CollectionName", schemaObject);
```

The CollectionName should be capitalized as a standard practice.

**Mongoose will:**
- Automatically convert the name to lowercase
- Pluralize it (e.g., "User" becomes "users")

## Customize Pluralization
```javascript
mongoose.pluralize((word) => word); // disables pluralization
```

## Disable Auto Collection Creation
```javascript
mongoose.set("autoCreate", false);
```

By default, Mongoose auto-creates collections even if no documents are inserted.

Disabling this avoids unnecessary empty collections.

## Insert Data
```javascript
const Model = mongoose.model("CollectionName", schemaObject);
await Model.insertOne({ name: "xyz" }); // ⚠️ Use `Model.create()` instead
```

**Note:** Model.insertOne() is not a Mongoose method — it's from native MongoDB.

**Use:**
```javascript
await Model.create({ name: "xyz" });
```

## Schema vs Model
- **Schema:** Defines the shape of documents (application-level)
- **Model:** Provides the interface for interacting with the DB collection using that schema