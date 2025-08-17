Here’s your complete Markdown note for Other Data Types in MongoDB:

## MongoDB Other Data Types

### String
- Most commonly used data type.  
- Stores text values.  
- Example:  
  ```json
  { "name": "Sahil" }

Boolean

Stores true or false.

Useful for flags or conditions.

Example:

{ "isActive": true }

Date

Stores date and time in ISODate format.

Example:

{ "createdAt": ISODate("2025-05-26T00:00:00Z") }

Array

Stores a list of values.

Example:

{ "tags": ["nodejs", "mongodb"] }

Object (Embedded Document)

Stores nested documents inside a field.

Example:

{ 
  "address": { 
    "city": "Mumbai", 
    "zip": 400001 
  } 
}

null

Stores a null value.

Example:

{ "middleName": null }

Regular Expression (Regex)

Stores a regex pattern for matching strings.

Example:

{ "name": { "$regex": /^S/ } }

MinKey

Special value that is less than any other value in MongoDB.

Mainly used in internal operations like range queries.

MaxKey

Opposite of MinKey — always greater than any other value.

Used in range operations and comparisons.


---
