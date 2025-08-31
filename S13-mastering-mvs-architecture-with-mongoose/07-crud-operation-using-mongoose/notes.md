# CRUD Operations Using Mongoose

## Setup First (Define Schema & Model)

```javascript
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});
const User = mongoose.model("User", userSchema);
module.exports = User;
```

## Create Operation

### insertOne()
(Not native to Mongoose — use MongoDB driver or .create() instead)

### insertMany()
Inserts an array of documents:
```javascript
await User.insertMany([
    { name: "John", email: "john@g.com" },
    { name: "Jane", email: "jane@g.com" }
]);
```

### create()
Flexible method that handles one or many:
```javascript
await User.create({ name: "Mike", email: "mike@g.com" });
await User.create([{ name: "A" }, { name: "B" }]);
```

### Using Instance & save()
```javascript
const user = new User({ name: "Sam", email: "sam@g.com" });
await user.save(); // Saves to DB
```

## Read Operation

### Find one
```javascript
const user = await User.findOne({ email: "xyz@g.com" }).lean();
```
Here, `.lean()` returns plain JS object (better performance, no Mongoose methods)

### Find all
```javascript
const users = await User.find().lean(); // Array of all users
```

### Find by ID
```javascript
const user = await User.findById("user_id").lean();
```

## Update Operation

### 1. Inefficient Way (2 DB Calls)
```javascript
const user = await User.findOne({ email: "xyz@g.com" });
user.age = 12;
await user.save();
```

### 2. Efficient Way (Single DB Call)
```javascript
const updatedUser = await User.findOneAndUpdate(
    { email: "xyz@gg.com" },
    { name: "Shizuka" },
    { new: true, runValidators: true }
);
```

- `new: true` → Returns the updated document
- `runValidators: true` → Ensures validation is applied during update

## Delete Operation

### Delete one by condition
```javascript
await User.findOneAndDelete({ email: "xyz@g.com" });
```

### Delete by ID
```javascript
await User.findByIdAndDelete("user_id");
```

### Delete many
```javascript
await User.deleteMany({ age: { $lt: 18 } });
```