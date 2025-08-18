# What is a Cursor?

## A Cursor is a JS object returned by .find()
It stores query metadata and doesn't hit DB until a method like .toArray() or .next() is called.

## Cursor as an Async Iterator
```javascript
const cursor = collection.find(); // returns a cursor
cursor[Symbol.asyncIterator]; // true ⇒ it's iterable
```

### You can use:
```javascript
for await (const doc of cursor) {
    console.log(doc);
}
```

## Cursor Methods (few)

```javascript
await cursor.next();     // Returns next document or null
await cursor.hasNext();  // Returns true/false
```