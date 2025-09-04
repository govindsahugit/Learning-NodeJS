# Mongoose Indexing

## Unique Index in Schema

Used in schema to enforce unique values for a field.

```javascript
email: { type: String, unique: true }
```

It creates a unique index.

If duplicates exist, index creation fails.

Clean duplicates before creating the index.

## Model.init()

Ensures all indexes defined in the schema are created in the DB.

Useful when auto-indexing is off.

```javascript
await User.init();
```

## autoIndex in Mongoose

Controls whether Mongoose builds indexes automatically when the app starts.

### Schema Level

```javascript
const schema = new Schema({}, { autoIndex: false });
```

### Connection Level

```javascript
mongoose.connect(uri, { autoIndex: false });
```
