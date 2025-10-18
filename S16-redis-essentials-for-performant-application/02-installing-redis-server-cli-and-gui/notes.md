## Redis - Server, Client & GUI

### Redis is not supported for Windows, use WSL for using Redis

### Run the following commands to download server & client of Redis

```bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

### After installing check the version of Redis by:

```bash
redis-server -v
redis-cli -v
```

### Default port for Redis is 6379

### For starting Redis as a service:

```bash
sudo service redis-server start
```

### Redis commands are not case sensitive

### Redis Insights GUI tool download
