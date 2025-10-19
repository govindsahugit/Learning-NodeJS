# RedisJSON Datatype

## What is it?

Lets you store and manage JSON data in Redis.

Use commands like JSON.SET, JSON.GET.

## Common Commands

### Set JSON

```
JSON.SET user:1 $ '{"name":"Sahil","age":25}'
```

### Get JSON

```
JSON.GET user:1          // Full JSON
JSON.GET user:1 $.name   // ["Sahil"]
```

### Delete Field

```
JSON.DEL user:1 $.location
```

### Increment Number

```
JSON.NUMINCRBY user:1 $.age 1
```

### Array Ops

```
JSON.ARRAPPEND user:1 $.hobbies '"coding"'
JSON.ARRPOP user:1 $.hobbies
JSON.ARRLEN user:1 $.hobbies
```

## JSONPath Basics

| Path      | Gets...         |
| --------- | --------------- |
| `$`       | Whole JSON      |
| `$.name`  | Name field      |
| `$[0]`    | 1st array item  |
| `$..name` | All name fields |

## Note

JSONPath always returns arrays like `["Sahil"]`.
