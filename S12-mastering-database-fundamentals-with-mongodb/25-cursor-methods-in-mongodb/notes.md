# Cursor Chaining

## Methods like .limit(), .skip(), .sort() return the cursor itself (not a promise)
You can chain them before executing with .toArray() or iterating.

## Common Methods
```javascript
collection.find()
    .limit(5)                    // Limit result to 5 docs
    .skip(2)                     // Skip first 2 docs
    .sort({ name: 1, age: -1 })  // Sort by name ↑, then age ↓
```

## No DB call is made until you use .toArray(), .next(), or a loop