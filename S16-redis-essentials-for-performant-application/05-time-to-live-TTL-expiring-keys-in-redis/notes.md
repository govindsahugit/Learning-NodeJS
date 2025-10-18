## Redis TTL and Expiry Commands

Redis supports setting TTL (Time To Live) for any key. Expiry commands are grouped by when the expiry is applied:

### While Setting Key

- `SET key value EX seconds` – Set with expiry in seconds
- `SET key value PX milliseconds` – Set with expiry in ms
- `SETEX key seconds value` – Legacy string-only alternative to SET ... EX
- `PSETEX key ms value` – Legacy string-only alternative to SET ... PX

### After Key is Set

- `EXPIRE key seconds` – Set expiry in seconds
- `PEXPIRE key ms` – Set expiry in milliseconds
- `EXPIREAT key timestamp` – Expire at Unix time (sec)
- `PEXPIREAT key ms_timestamp` – Expire at Unix time (ms)
- `TTL key` – Time left (seconds)
- `PTTL key` – Time left (milliseconds)
- `PERSIST key` – Remove expiry
