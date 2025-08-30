# Mongoose Schema Essentials

## Common Field Properties

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must be at least 3 characters"],
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: [3, "Age must be at least 3"],
    required: function () {
      return this.name === "child"; // Conditional required
    },
    default: null,
  },
  email: {
    type: String,
    match: [/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, "Invalid email format"],
    uppercase: true,
  },
});
```

## Other Schema Options

Passed in the second argument of new mongoose.Schema():

```javascript
const schemaOptions = {
  strict: true, // Ignores fields not defined in the schema
  timestamps: true, // Adds createdAt and updatedAt
  versionKey: false, // Removes __v field
  collection: "users", // Custom collection name
  timeseries: {}, // For time-series collections (MongoDB >= 5.0)
};

const userSchema = new mongoose.Schema(
  {
    /* fields */
  },
  schemaOptions
);
```

## ObjectId Reference

```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}
```
