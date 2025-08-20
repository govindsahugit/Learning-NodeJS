# Why ObjectId is not a String in MongoDB?

## ObjectId is a special type in MongoDB that takes only 12 bytes, while a string version would take 24 bytes

It is more efficient because it uses half the space of a string.

## In hex, 2 characters = 1 byte

## An ObjectId is made up of:

- Timestamp
- Machine ID & Process ID
- Counter

## MongoDB uses the binary (12-byte) form, not the full string, when inserting or querying
