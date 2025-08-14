### Chaining HTTP Methods with app.route()

Used to chain multiple HTTP methods (like `GET`, `POST`, etc.) for the same route in a cleaner way.

#### Example

```js  
app.route("/user")  
  .get(getUser)  
  .post(createUser)  
  .put(updateUser);  