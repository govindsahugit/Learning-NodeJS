## CORS (Cross-Origin Resource Sharing)

CORS is a security feature in web browsers that controls cross-origin HTTP requests. It was introduced around 2006 by W3C to overcome Same-Origin Policy limitations.

### Why CORS is Needed?

- Browsers' Same-Origin Policy blocks cross-origin requests by default
- Prevents security vulnerabilities like CSRF and XSS attacks
- CORS provides a safe way to allow cross-origin requests

### Understanding Origin

An origin consists of:

- Protocol (http/https)
- Domain
- Port number

**Example:**

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

These are different origins, requiring CORS configuration.

### Implementing CORS in Express

1. Install CORS middleware:

```bash
npm install cors
```

2. Basic implementation:

```javascript
const cors = require("cors");
app.use(cors());
```

3. Origin-specific implementation:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
```

### Key CORS Headers

Server responds with headers like:

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
