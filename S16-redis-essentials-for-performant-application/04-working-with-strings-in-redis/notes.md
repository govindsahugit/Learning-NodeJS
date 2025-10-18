## Redis Key and String Operations

### Key Operations

- `keys *` – Get all keys in the database
- `del key` – Delete the specified key

### String Set/Get Operations

- `set key value` – Set a key to hold the string value
- `get key` – Get the value of a key
- `setnx key value` – Set the value only if the key does not exist
- `getset key value` – Get the old value and set the new one
- `append key value` – Append a value to the existing string
- `strlen key` – Get the length of the value stored at key

### String Range

- `getrange key start end` – Get a substring from the stored value

### Numeric Operations (if value is an integer or float)

- `incr key` – Increment the value by 1
- `decr key` – Decrement the value by 1
- `incrby key number` – Increment the value by a specific integer
- `decrby key number` – Decrement the value by a specific integer
- `incrbyfloat key number` – Increment the value by a float
