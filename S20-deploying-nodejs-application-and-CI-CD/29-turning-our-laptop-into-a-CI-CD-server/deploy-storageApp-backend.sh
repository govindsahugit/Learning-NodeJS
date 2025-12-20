ssh storageApp "bash" << 'EOF'

set -e

cd "/home/ubuntu/StorageApp-Backend"
git pull
npm ci
pm2 reload storageApp

EOF