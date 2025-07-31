# Intro to ExpressJS

Express.js is a web framework for Node.js. (Nest.js is another web framework option.)

## Installation
```bash
npm i express
```

## Basic Server Example
```javascript
import express from "express";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(4000);
```

### Key Notes:
- `res.send()`: Automatically sets content-type header as HTML
- `res.end()`: Sends plain text only

### Headers Configuration
To disable specific headers:
```javascript
app.disable(headerName);
```