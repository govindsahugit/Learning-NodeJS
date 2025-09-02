# Mongoose Virtuals

## Virtuals are computed properties in Mongoose documents, not stored in MongoDB
Common use: derive fullName from firstName + lastName.

Mongoose adds an id virtual by default (string version of _id).

## Creating Virtuals

### Getter only
```javascript
schema.virtual('fullName').get(() => ...)
```

### Getter + Setter
```javascript
schema.virtual('fullName').get(() => ...).set(val => ...)
```

## Accessing Virtuals

### Enable in output
```javascript
doc.toJSON({ virtuals: true })
doc.toObject({ virtuals: true })
```

### Schema-level access
```javascript
schema.virtuals
```

## Virtuals & .lean()
By default, virtuals do not work with `.lean()`.

To include them:
```javascript
Model.find().lean({ virtuals: true })
```