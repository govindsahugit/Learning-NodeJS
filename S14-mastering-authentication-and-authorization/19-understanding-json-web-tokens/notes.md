# What is JWT?

JWT is a secure, compact token used for authentication and authorization, containing 3 parts:

- **Header:** Token type & algorithm
- **Payload:** Data (e.g., user ID, role)
- **Signature:** Verifies data integrity

## Common JWT Methods

- jwt.sign(payload, secret, options)

Creates a token.

**Example:**

```javascript
jwt.sign({ userId: 1 }, "secret", { expiresIn: "1h" });
```

- jwt.verify(token, secret)

Verifies and decodes token.

**Example:**

```javascript
jwt.verify(token, "secret");
```

- jwt.decode(token)

Decodes token without verifying.

**Example:**

```javascript
jwt.decode(token);
```
