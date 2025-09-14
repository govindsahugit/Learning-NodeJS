# Bcrypt

## Two NPM Packages

- **bcrypt** → C++ based (faster, use in Node.js backend)
- **bcryptjs** → Pure JavaScript (use in browser or where native modules are not available)

## When to Use What

- **Node.js (server-side):** Prefer bcrypt for performance
- **Browser (client-side):** Use bcryptjs since it runs without native bindings

## Common bcrypt Methods

### 1. bcrypt.genSalt(rounds)

Generates a unique salt.

`rounds` defines the cost factor — higher means slower but more secure.

**Example:**

```javascript
const salt = await bcrypt.genSalt(10);
```

### 2. bcrypt.hash(password, saltOrRounds)

Hashes the password with a salt.

You can pass:

- a salt string: `bcrypt.hash(password, salt)`
- or rounds directly: `bcrypt.hash(password, 10)` (auto-generates salt)

**Example:**

```javascript
const hashed = await bcrypt.hash("mypassword", salt);
```

### 3. bcrypt.compare(plain, hashed)

Compares a plain password with its hashed version.

Returns true if matched.

**Example:**

```javascript
const isMatch = await bcrypt.compare("mypassword", hashed);
```
