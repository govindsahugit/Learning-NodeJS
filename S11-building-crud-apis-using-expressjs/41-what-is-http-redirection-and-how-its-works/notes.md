# HTTP Redirects Guide

## Overview

Redirect tells the browser to go to a different URL using a status code and a Location header.

## Common Status Codes

- **300**: Multiple choices, client picks from options.
- **301**: Permanently moved; the browser may change the HTTP method (usually to GET).
- **302**: Temporarily moved; method may also change.
- **303**: Always changes method to GET.
- **307**: Temporary redirect but keeps the same HTTP method.
- **308**: Permanent redirect, method remains the same.

## How to Redirect in Node.js

```javascript
res.writeHead(301, { Location: "/folder" });
res.end();
```

## How to Redirect in Express

```javascript
res.redirect('/folder');       // Default 302 redirect
res.redirect(301, '/folder');  // Explicit 301 redirect
```

Express sets the status and Location header automatically.