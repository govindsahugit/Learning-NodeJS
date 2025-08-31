# Thenable Objects

## A thenable is any object with a .then() method
It acts like a promise, but isn't necessarily created using Promise.

Works with await and Promise.resolve().

## Example
```javascript
const thenable = {
  then: (resolve, reject) => {
    resolve("Done!");
  }
};

await thenable; // Works like a promise
```