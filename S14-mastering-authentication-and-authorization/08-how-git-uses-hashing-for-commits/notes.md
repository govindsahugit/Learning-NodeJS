# How Git Uses Hashing — Summary

Git uses the SHA-1 algorithm to uniquely identify content. But it doesn't hash raw file data directly — it uses a special format:

## For files, the format is:

```
blob lengthOfData\0fileData
```

## Why This Format?

- Ensures uniqueness between object types (blob, tree, commit)
- Adds integrity by including content length and type
- Prevents collisions across different objects

## Git uses the same pattern for:

- **blob:** file data
- **tree:** directory structure
- **commit:** commit metadata
- **tag:** tag info
