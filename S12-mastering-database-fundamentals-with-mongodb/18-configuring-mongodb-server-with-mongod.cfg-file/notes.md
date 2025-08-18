# MongoDB Config File

- It’s a text file where you tell MongoDB how to run.

## Things you can set
- **dbPath** → Where to save your data.  
- **logPath** → Where to save logs.  
- **net** (address & port) → What network address and port to use.

## Example (Windows)
```yaml
storage:
  dbPath: C:\my_mongo_data
systemLog:
  destination: file
  path: C:\my_mongo_logs\mongod.log
net:
  bindIp: 127.0.0.1
  port: 27017
