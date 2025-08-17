### Behind the Scenes: MongoDB Data Packets

- **MongoDB Protocol** is built on top of **TCP**.  
- Establishes a **three-way TCP handshake** when connecting.  
- Sends **request–response packets every 3–5 seconds** to check if the connection is alive.  
- For every **DB call (operation)**, a **request** is sent to the server.  
- DB calls in **Mongo Shell** are **synchronous**.  
