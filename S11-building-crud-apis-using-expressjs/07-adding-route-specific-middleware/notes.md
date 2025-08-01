# Route-Specific Middleware in Express

Use `app.use('/path', middleware)` to apply middleware to specific route paths.

```javascript
// Middleware will run for all routes starting with /user
app.use('/user', (req, res, next) => {
    console.log("Middleware for /user");
    next();
});
```

### Path Matching:
✅ Matches:
- `/user`
- `/user/123`
- `/user/profile`

❌ Does Not Match:
- `/admin`
- `/api`
- Any path not starting with `/user`