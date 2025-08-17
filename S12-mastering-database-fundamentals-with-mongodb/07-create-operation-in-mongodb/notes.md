# Create Operation in MongoDB

## Create Operation through GUI
- Click **'+'** on Connection.  
- Enter **Database name** and **Collection name**.  
- To create a document:  
  - Click on **"Add Data"** in the Collection.  
  - You have 2 options:  
    - Import JSON  
    - Insert Document  
  - Write your data in **JSON format**.  

➡️ The data will be stored in the main **MongoDB Server**.  

## Create Operation through Shell
```js
use <DatabaseName>

// Insert a single document
db.<CollectionName>.insertOne(<Document>)

// Insert multiple documents
db.<CollectionName>.insertMany(<Documents>)
