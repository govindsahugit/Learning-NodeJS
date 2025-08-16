## Clients to Connect to MongoDB Server

- **MongoDB Compass:** Official GUI client for interacting with the server.  
- **MongoDB VS Code Extension:**  
  Acts as another client to connect to the server.  
  Often provides more detailed views and features than Compass (like document preview, schema, and queries within the editor).  

## MongoDB Server Summary

- MongoDB Server is mainly built in **C++**, along with other languages.  
- **Port:** Uses a fixed default port `27017` (other ports won’t work unless configured).  
- On installation, MongoDB defaults to a virtual **test** database, which isn’t created on disk until data is stored.  
- You can view available databases with:  
  ```js
  show("databases")
  // or its short form
  show dbs
