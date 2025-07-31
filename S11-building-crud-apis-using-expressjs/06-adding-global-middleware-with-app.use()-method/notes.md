# Global Middleware in Express.js

A global middleware is a function that executes for every incoming request to your Express application, regardless of the route or HTTP method.

## Basic Syntax
```javascript
app.use(middlewareFunction);
```

## Key Points
- `app.use()` registers middleware globally
- Must be placed before route handlers
- Executes before any route matching occurs

## Important Notes
- Always define global middleware before route definitions
- Call `next()` to pass control to next middleware/route
- Multiple `app.use()` can be chained for different functionalities

## Example
```javascript
app.use((req, res, next) => {
    console.log('Global middleware executed');
    next();
});
```