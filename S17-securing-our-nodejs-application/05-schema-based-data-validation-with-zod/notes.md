# Zod Validation Library

Zod is a JavaScript/TypeScript library used to check and validate data (like form inputs or API requests).

## Why Use Zod?

- Makes sure data is in the correct format
- Works great with TypeScript
- Easy to use and fast
- Catches invalid or missing data early

## Example

```javascript
const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});
```

Then you can validate data like this:

```javascript
userSchema.parse({ name: "Sahil", age: 22 }); // ✅ Valid
userSchema.parse({ name: "Sahil", age: "twenty" }); // ❌ Error
```

# safeParse in Zod

## safeParse is a method in Zod that lets you validate data safely without crashing your app

## How it Works

- Returns an object with `{ success: true, data }` if valid
- Returns `{ success: false, error }` if invalid

## Example

```javascript
const result = userSchema.safeParse({ name: "Sahil", age: "twenty" });

if (result.success) {
  console.log("✅ Valid:", result.data);
} else {
  console.log("❌ Error:", result.error.issues);
}
```
