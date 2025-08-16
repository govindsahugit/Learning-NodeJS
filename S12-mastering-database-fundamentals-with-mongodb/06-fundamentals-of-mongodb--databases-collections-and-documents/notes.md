## Fundamentals of MongoDB

### Default Databases
MongoDB Server by default creates these databases (we should not manipulate them):  
- **admin**  
- **config**  
- **local**  

### Database
- The main entity for our app is **Database**.  
- A database can have multiple **collections**.  
- `drop database` means **DELETE Database**.  
- A database is only created when it has at least **one collection** and **one document**.  

### Collections
- Part of a **Database**.  
- Can have multiple **documents**.  
- Not actually an array, but similar to an array.  
- `drop collection` means **DELETE Collection**.  

### Documents
- A **JSON object** that stores the actual data.  

### Example: StorageApp Database
- **Main Entity (Database):** `StorageAppDB`  
- **Collection:** `directoriesCollection.json`  
- **Document:** Each Directory Object  

### Connections
- A connection means a link between the **client** and the **server**.  
- There can be different (user) connections on a single server.  

### Commands
```js
use("<Database Name>") // or use <Database Name>
// If the database does not exist, it creates a non-existing database reference and switches to it.

show collections
// Shows all existing collections.
