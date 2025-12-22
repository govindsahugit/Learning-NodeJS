set -e

PROJECT_DIR="F:\Web Development\BACKEND DEVELOPMENT\StorageApp\client"

cd "$PROJECT_DIR"
git pull

echo "Installing client dependencies (npm ci)..."
npm ci --no-audit --no-fund

npm run test
npm run build
echo "Uploading build files to S3 bucket"

aws s3 sync "$/home/runner/work/StorageApp-Frontend/StorageApp-Frontend/dist" s3://storage-app-frontend --delete
aws cloudfront create-invalidation --distribution-id ET2RX5F4BTHHS --paths "//index.html"

echo "Frontend Deployed Successfully..."