# Cryptography Summary

Cryptography secures data and ensures privacy, integrity, and authenticity.

## Encryption (Reversible)

- Converts readable data (plaintext) into unreadable form (ciphertext)
- Can be reversed using a key
- Used when you need to retrieve original data
- **Common algorithms:** AES, RSA (avoid DES)

## Hashing (Irreversible)

- Converts data into a fixed-size hash/digest
- One-way — cannot be reversed
- Used for verifying data or storing passwords
- **Common algorithms:** SHA-256 (avoid MD5, SHA-1)
- Use salt to prevent attacks
