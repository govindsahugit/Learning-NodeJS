# Embedded vs Referenced Documents

## Embedded Documents
**Meaning:** Related data is stored inside the same document.

**Example:**
```javascript
{ 
  "name": "John", 
  "address": { 
    "city": "Mumbai", 
    "zip": "400001" 
  } 
}
```

**Good for:** Data used together

**Pros:** Fast reads

**Cons:** Can get large, harder to update

## Referenced Documents
**Meaning:** Related data is stored in a separate document and linked by ID.

**Example:**
```javascript
{ 
  "name": "John", 
  "address_id": "abc123" 
}
```

**Good for:** Shared or large data

**Pros:** Cleaner, flexible

**Cons:** Requires extra query to fetch related data