# What is Pub/Sub?

## Publish/Subscribe is a messaging pattern where:

- Publishers send messages to a channel
- Subscribers listen and receive those messages

## Both are decoupled (they don't know each other)

## Great for real-time and event-driven systems

# Redis Pub/Sub Basics

## Commands

- `SUBSCRIBE channel` → Start listening
- `PUBLISH channel message` → Send message to subscribers
- `UNSUBSCRIBE channel` → Stop listening

## Messages are not saved — you must be online to receive them

# Node.js Example (using node-redis)

```javascript
const { createClient } = require("redis");

const subscriber = createClient();
const publisher = createClient();

await subscriber.connect();
await publisher.connect();

await subscriber.subscribe("chat", (msg) => {
  console.log("Received:", msg);
});

await publisher.publish("chat", "Hello!");
```
