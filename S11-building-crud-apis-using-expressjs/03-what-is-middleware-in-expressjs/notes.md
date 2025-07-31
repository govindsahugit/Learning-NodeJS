# Middleware in Express.js

Middleware functions are request handlers that can process incoming requests and outgoing responses in Express apps.

## Basic Syntax

```js
(req, res, next) => { ... }
```

- Multiple middlewares can be chained
- Each middleware must call `next()` to pass control forward

## Example with Multiple Middlewares

```js
app.get(
  "/",
  (req, res, next) => {
    console.log("M1");
    next(); // moves to next middleware
  },
  (req, res) => {
    console.log("M2");
    res.send("Done");
  }
);
```

**Note:** If `next()` is not called, subsequent middleware won't execute.

## Behind the Scenes

- Express stores route middlewares in an array
- Executes them sequentially on request
- Calling `next()` in last middleware has no effect

## Types of Middleware

### 1. Request Handler Middleware

```js
(req, res, next) => { ... }
```

- Executes on every request
- Common uses: logging, parsing, authentication

### 2. Error Handling Middleware

```js
(err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
};
```

- Requires 4 parameters
- Triggers on:
  - `next(err)` calls
  - Thrown errors in previous middleware

### Built-in Error Handling

Express provides default error handling, but can be overridden:

```js
app.use((err, req, res, next) => {
  res.status(500).send(`Custom error: ${err.message}`);
});
```
