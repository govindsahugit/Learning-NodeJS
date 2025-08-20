# The $in Operator

## The $in operator in MongoDB checks if a field's value exists in a specified array

## Syntax
```javascript
{ field: { $in: [value1, value2, ...] } }
```

## Example
```javascript
db.users.find({ age: { $in: [18, 25, 30] } });
```
Matches users whose age is 18, 25, or 30.

## Use case
Efficiently fetch multiple values in one query.