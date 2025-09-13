# Key Derivation Function (KDF)

## Purpose

Converts weak secrets (like passwords) into strong cryptographic keys.

## Why needed

Passwords are short and predictable — KDFs add salt, iterations, and complexity to resist attacks.

## How it works

Input (password) + Salt + Iterations → Secure Key

## Popular KDFs

- **PBKDF2** – HMAC-based, widely used
- **bcrypt** – Good for password hashing
- **scrypt** – Memory hard, protects against GPU attacks
- **Argon2** – Modern, recommended for passwords
- **HKDF** – Used for key expansion (not passwords)
