# Ordered Inserts

## Documents are inserted in order

## If any insert fails, remaining inserts are stopped, and an error is thrown

## To continue inserting remaining valid documents, use:
```javascript
{ ordered: false }
```