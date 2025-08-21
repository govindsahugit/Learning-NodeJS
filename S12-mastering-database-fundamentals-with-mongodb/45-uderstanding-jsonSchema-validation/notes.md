# MongoDB JSON Schema Validation

## Key Points
- Defines strict structure, data types, and rules for documents.
- Supports nested validation.
- `additionalProperties: false` blocks extra unwanted fields.

## Example with Nested Fields

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age", "address"],
      additionalProperties: false,
      properties: {
        name: { bsonType: "string" },
        age: { bsonType: "int", minimum: 18 },
        address: {
          bsonType: "object",
          required: ["city", "zip"],
          additionalProperties: false,
          properties: {
            city: { bsonType: "string" },
            zip: { bsonType: "int" }
          }
        }
      }
    }
  }
});
