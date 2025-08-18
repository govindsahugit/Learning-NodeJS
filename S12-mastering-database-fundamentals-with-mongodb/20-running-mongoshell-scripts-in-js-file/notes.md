Running JavaScript files with Mongo shell
To run a JavaScript file using the Mongo shell, you use the command mongosh followed by the path to your script:

mongosh your_script.js

Important Considerations
Valid JavaScript: The file must contain only valid JavaScript code that uses the MongoDB API methods to interact with the database.

Accessing Collections: Use db.getCollection("collection_name") to access a collection. This is particularly useful when the collection name contains special characters or spaces.