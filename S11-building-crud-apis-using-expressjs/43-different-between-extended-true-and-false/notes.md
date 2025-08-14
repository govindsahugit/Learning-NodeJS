# URL Encoding: Extended vs Non-Extended Parsing

When working with URL-encoded data (typically from HTML forms), you have two main parsing options that handle the data structure differently.

## Extended: False (Default)

**Library Used:** `querystring`

**Characteristics:**
- Does not support nested objects
- Parses data into a flat object with string values
- Simpler parsing approach
- Faster performance for simple data

**Example Output:**
```javascript
{
  'user[firstname]': 'John',
  'user[lastname]': 'Doe'
}
```

## Extended: True

**Library Used:** `qs` (query string)

**Characteristics:**
- Supports nested objects and arrays
- Parses data into properly structured nested objects
- More sophisticated parsing capabilities
- Better for complex form data structures

**Example Output:**
```javascript
{
  user: {
    firstname: 'John',
    lastname: 'Doe'
  }
}
```

## When to Use Which

### Use `extended: false` when:
- Working with simple, flat form data
- Performance is critical
- You don't need nested object structures
- Dealing with legacy systems that expect flat parsing

### Use `extended: true` when:
- Working with complex forms that have nested data
- You want proper object structure in your parsed data
- Building modern applications with structured data requirements
- You need to handle arrays and nested objects from forms

## Configuration Example

```javascript
// Express.js middleware configuration
app.use(express.urlencoded({ extended: false })); // Uses querystring
app.use(express.urlencoded({ extended: true }));  // Uses qs
```