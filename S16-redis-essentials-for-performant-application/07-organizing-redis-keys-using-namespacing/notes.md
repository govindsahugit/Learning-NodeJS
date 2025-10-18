# Redis Key Namespacing

## What

Add prefixes to keys (e.g., `user:1001:name`) to group related data.

## Format

```
<namespace>:<entity>:<attribute>
```

## Why

Organizes data, avoids key conflicts, helps in debugging and deletion.

## Use

- `KEYS user:*` – Get all user keys

## Best Practices

Use `:` as separator, keep it consistent and simple.

## Note

Namespacing is manual — Redis doesn't enforce it.
