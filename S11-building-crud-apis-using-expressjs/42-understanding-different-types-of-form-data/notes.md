# Form Data Content Types

## 1. application/x-www-form-urlencoded (default)

- Fields separated by & (e.g., name=John&age=30)
- File data not sent, only filenames
- Use in Express: `express.urlencoded({ extended: false })`

## 2. multipart/form-data

- Fields separated by boundaries like --WebKitFormBoundary
- File data is sent as binary along with fields
- Used for file uploads
- Handled in Express by Multer middleware

## 3. text/plain

- Fields separated by new lines (\n)
- File data not sent, only filenames
- Use in Express: `express.text()`

## 4. application/json

- Data sent as JSON string
- Use in Express: `express.json()`