# Mongoose Built-in Errors

## CastError

Occurs when a value can't be cast to the required type.

**Example:**

```javascript
await User.findById("invalid-id"); // throws CastError
```

## ValidationError

Happens when schema validation fails.

**Example:**

```javascript
const user = new User({ email: "" });
await user.save(); // throws ValidationError for missing email
```

## ValidatorError

Thrown for specific field validation failures.

**Example:**

```javascript
email: {
  type: String,
  validate: v => v.includes("@") // if not, throws ValidatorError
}
```

## DocumentNotFoundError

Happens when `.orFail()` is used and no document is found.

**Example:**

```javascript
await User.findById("someid").orFail(); // throws DocumentNotFoundError
```

## VersionError

Occurs when there's a conflict in the `__v` version key during save (optimistic concurrency).

**Example:**

```javascript
doc.__v = 2;
await doc.save(); // throws VersionError
```

## OverwriteModelError

Thrown when trying to define a model with an existing name.

**Example:**

```javascript
mongoose.model("User", schema);
mongoose.model("User", schema); // throws OverwriteModelError
```

## MissingSchemaError

Occurs when you try to use a model that hasn't been defined yet.

**Example:**

```javascript
mongoose.model("Unknown"); // throws MissingSchemaError
```
https://github.com/KunalKhandekar/README-s/blob/main/MVC.md