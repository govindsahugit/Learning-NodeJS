### Mongoose Document Versioning

- Mongoose uses a __v field to track how many times a document has been modified

- This version key is automatically incremented on .save()

- It helps with optimistic concurrency — preventing overwrites if another process updates the same document

- You can enable it with { optimisticConcurrency: true } in the schema

- Changes to arrays or subdocuments also increase __v

- You can customize the version key or disable it using the versionKey option