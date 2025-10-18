# Redis Database Management

## View Total Databases

- `CONFIG GET databases` – Shows how many databases are configured (default is 16)

## Switch Between Databases

- `SELECT index` – Switch to a database (e.g., SELECT 1 for DB 1)
- Databases are numbered from 0 to 15 by default

## Count Keys in a Database

- `DBSIZE` – Shows the number of keys in the current DB
- `redis-cli -n 2 DBSIZE` – Check keys in a specific DB (DB 2 here)

## Change Number of Databases

Edit redis.conf:

```
databases 4
```

Limits Redis to databases 0–3.

## Key Tips

- Only numbered databases (no names)
- All DBs share the same memory
- No memory tracking per DB
