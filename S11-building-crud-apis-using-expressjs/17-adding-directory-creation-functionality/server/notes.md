# Serving Static Files in Express

## Using express.static() middleware
1. Create a folder for static files (e.g., `public`)
2. Add the middleware:
```javascript
app.use(express.static('public'));
```

## Accessing Static Files
- Files in the `public` folder are served directly at root URL
- Example: `http://localhost:3000/logo.png` serves `public/logo.png`

## Sending Specific Files
```javascript
res.sendFile(__dirname + '/path/to/file.txt');
```
- Sends individual files using absolute path
- Requires `__dirname` to ensure correct file location