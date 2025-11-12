# What is AWS S3 Bucket?

## An AWS S3 Bucket is basically a container for storing data in the cloud using Amazon Simple Storage Service (S3)

Think of it like a main folder on your computer, but instead of being stored locally, it lives in the AWS cloud. Inside a bucket, you can put files (called objects) like images, videos, backups, or documents.

## Key Points:

- **Bucket = Container** → Every object (file) is stored in a bucket
- **Objects = Files** → Each has data + metadata (info about the file)
- **Scalable** → You can store unlimited data, from MBs to petabytes
- **Durable & Available** → Data is automatically backed up across multiple AWS locations
- **Permissions** → You control who can access your bucket (private, public, or restricted)
- **Versioning** → Keeps old versions of files, so you can roll back if needed
- **Static Website Hosting** → You can even host a simple website (HTML/CSS/JS) from it

## Example:

1. Create a bucket → `my-app-bucket`
2. Upload a file → `logo.png`
3. S3 generates a URL: `https://my-app-bucket.s3.amazonaws.com/logo.png`
4. Depending on settings, this link may be private (only you) or public (anyone with the link)

## In short: An S3 bucket is like your cloud drive on AWS, but with enterprise-level durability, scalability, and security
