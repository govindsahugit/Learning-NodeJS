# mongodump and mongorestore

## mongodump (Backup)
Creates a backup of MongoDB data in BSON format.

Can dump entire DB, specific DB, or collections.

Supports options like compression (--gzip), authentication, and dumping to archive files.

**Example:**
```bash
mongodump --db mydatabase --out /backup/mongo/
```

## mongorestore (Restore)
Restores data from BSON backups created by mongodump.

Can restore entire dump, specific DB, or collections.

Supports options like dropping existing data before restore (--drop), authentication, and reading from archives or compressed files.

**Example:**
```bash
mongorestore --db mydatabase /backup/mongo/mydatabase/
```