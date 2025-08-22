# mongoexport and mongoimport

## mongoexport (Export Data)
Exports data from MongoDB to JSON or CSV files.

Useful for sharing or backing up in readable formats.

**Common Options:** --db, --collection, --out, --type, --fields, --query, --jsonArray

**Example:**
```bash
mongoexport --db mydatabase --collection users --out users.json
```

## mongoimport (Import Data)
Imports data into MongoDB from JSON or CSV files.

Used to restore, migrate, or populate data.

**Common Options:** --db, --collection, --file, --type, --fields, --jsonArray, --drop

**Example:**
```bash
mongoimport --db mydatabase --collection users --file users.json
```