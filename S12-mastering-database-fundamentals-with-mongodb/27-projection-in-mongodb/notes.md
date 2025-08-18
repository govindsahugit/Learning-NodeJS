# What is Projection?

## Projection controls which fields are returned in the query result

## Include Fields

```javascript
// Include only "name" and "email"
const users = await collection
  .find({}, { projection: { name: 1, email: 1 } })
  .toArray();
```

## Exclude Fields

```javascript
// Exclude "age"
const users = await collection.find({}, { projection: { age: 0 } }).toArray();
```

## Note

- 1 = include, 0 = exclude
- You can't mix include and exclude (except for \_id)
