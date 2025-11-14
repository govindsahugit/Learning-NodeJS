import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ profile: "nodejs" });

// const command = new GetObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "Snapchat-690107645.jpg",
// });

// const command = new PutObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "Snapchat-690107645.jpg",
// });

const command = new DeleteObjectCommand({
  Bucket: "myawsbucketforsta1",
  Key: "Snapchat-690107645.jpg",
});

const url = await getSignedUrl(s3Client, command);
console.log(url);
