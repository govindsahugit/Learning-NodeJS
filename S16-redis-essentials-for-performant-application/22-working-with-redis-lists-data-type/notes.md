# What is a Redis List?

## An ordered collection of strings — like a queue or stack

Supports adding/removing from both left and right.

## Common Commands

- `LPUSH mylist "a"` → Add to left
- `RPUSH mylist "b"` → Add to right
- `LPOP mylist` → Remove from left
- `RPOP mylist` → Remove from right
- `LRANGE mylist 0 -1` → Get all items
- `LLEN mylist` → List length
- `LINDEX mylist 0` → Get item at index
- `LREM mylist 1 "a"` → Remove item(s)
- `LTRIM mylist 0 2` → Keep only index 0 to 2
