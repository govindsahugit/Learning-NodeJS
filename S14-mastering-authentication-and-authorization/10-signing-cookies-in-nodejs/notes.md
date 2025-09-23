# Cookie Auth Summary

## On Login:

1. Create payload → `{ id, expiry }`
2. Sign it using: `sha256(secretKey + payload + secretKey)`
3. Encode payload (base64url) → make: `encodedPayload.signature`
4. Set cookie `uid=encodedPayload.signature`

## On Each Request:

1. Extract cookie → split into payload + signature
2. Recreate hash → `sha256(secretKey + payload + secretKey)`
3. Compare hashes → reject if mismatch
4. Check expiry
5. Find user by ID → attach to `req.user`
