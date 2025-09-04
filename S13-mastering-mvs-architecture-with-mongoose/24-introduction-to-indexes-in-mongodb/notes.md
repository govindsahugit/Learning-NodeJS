# MongoDB Indexes

Indexes in MongoDB are special data structures that improve the speed of read operations (like find, sort) by allowing MongoDB to quickly locate documents in a collection, just like an index in a book.

## Why Indexes?

Without an index, MongoDB performs a collection scan—checks every document. This is slow for large datasets.

## Usage

### Create

```javascript
db.collection.createIndex({ field: 1 });
```

### View

```javascript
db.collection.getIndexes();
```

### Delete

```javascript
db.collection.dropIndex({ field: 1 });
```
