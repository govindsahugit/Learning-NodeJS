## 🧠 What is *monkey patching*?

**Monkey patching** means:

> 👉 **Modifying or overriding existing code (functions, methods, objects) at runtime**, without changing the original source code.

---

## 🔧 Simple example

```js
const originalLog = console.log;

console.log = function (...args) {
  originalLog("[patched]", ...args);
};

console.log("Hello");
```

Output:

```text
[patched] Hello
```

👉 You didn’t change Node.js source code  
👉 You changed behavior **at runtime**

That’s monkey patching.

---

## 🧩 Why is it called “monkey” patching?

It’s not a technical term from the beginning.

* “Patch” → fixing or modifying something
* “Monkey” → doing something **quickly, hacky, or dynamically**

So:

> 🐒 “Monkey patching” = dynamically hacking behavior

---

## 🎯 Where is it used?

### 1. Observability tools

Libraries like:

* OpenTelemetry
* APM tools

They monkey patch things like:

* `http.request`
* Express middleware
* database clients

👉 So they can track:

* requests
* latency
* errors

Without you changing your app code

---

### 2. Fixing bugs temporarily

```js
Array.prototype.custom = function () {
  return "patched!";
};
```

---

### 3. Adding behavior globally

Example: logging, validation, tracing

---

## ⚙️ What exactly can be patched?

In JavaScript, almost everything:

* functions
* object methods
* prototypes
* globals (`console`, `fetch`, etc.)

Because JS is **dynamic**

---

## 🧠 Clean mental model

```text
Original behavior:
console.log → prints normally

After monkey patch:
console.log → your custom function → calls original
```

---

## ⚠️ Why it’s powerful (and dangerous)

### ✅ Pros

* no need to modify original code
* works globally
* very powerful for instrumentation

---

### ❌ Cons

* can break things silently
* hard to debug
* affects third-party libraries too
* order of execution matters (very important)

---

## ⚡ One-line definition

> Monkey patching is dynamically changing existing behavior at runtime without modifying the original source code.