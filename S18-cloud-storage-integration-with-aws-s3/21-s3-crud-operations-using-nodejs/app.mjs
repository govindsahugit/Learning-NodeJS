import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  DeletePublicAccessBlockCommand,
  GetObjectCommand,
  GetPublicAccessBlockCommand,
  HeadObjectCommand,
  ListObjectsCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { createReadStream, createWriteStream } from "fs";

const s3Client = new S3Client({
  profile: "nodejs",
});

// =========================================== //

// BUCKET COMMANDS

// const createBucketsCommand = new CreateBucketCommand({
//   Bucket: "myawsbucketforsta1",
// });
// const response = await s3Client.send(createBucketsCommand);
// console.log(response);

// =========================================== //

// const getPublicAccessBlockCommand = new GetPublicAccessBlockCommand({
//   Bucket: "myawsbucketforsta1",
// });
// const response = await s3Client.send(getPublicAccessBlockCommand);
// console.log(response);

// =========================================== //

// const putPublicAccessBlockCommand = new PutPublicAccessBlockCommand({
//   Bucket: "myawsbucketforsta1",
//   PublicAccessBlockConfiguration: {
//     BlockPublicAcls: false,
//     BlockPublicPolicy: false,
//     IgnorePublicAcls: false,
//     RestrictPublicBuckets: false,
//   },
// });
// const response = await s3Client.send(putPublicAccessBlockCommand);
// console.log(response);

// =========================================== //

// const deletePublicAccessBlockCommand = new DeletePublicAccessBlockCommand({
//   Bucket: "myawsbucketforsta1",
// });
// const response = await s3Client.send(deletePublicAccessBlockCommand);
// console.log(response);

// =========================================== //

// const policy = {
//   Version: "2012-10-17",
//   Statement: [
//     {
//       Sid: "PublicReadGetObject",
//       Effect: "Allow",
//       Principal: "*",
//       Action: "s3:GetObject",
//       Resource: "arn:aws:s3:::myawsbucketforsta1/*",
//     },
//   ],
// };
// const command = new PutBucketPolicyCommand({
//   Bucket: "myawsbucketforsta1",
//   Policy: JSON.stringify(policy),
// });
// await s3Client.send(command);

// =========================================== //

// const command = new DeleteBucketCommand({
//   Bucket: "myawsbucketforsta2",
// });
// const response = await s3Client.send(command);
// console.log(response);

// =========================================== //

// OBJECT COMMANDS

// const command = new ListObjectsCommand({
//   Bucket: "myawsbucketforsta1",
//   // Prefix: "images/",
// });
// const response = await s3Client.send(command);
// console.log(response);

// =========================================== //

// const command = new HeadObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   // Key: "Snapchat-245241462.jpg",
//   Key: "images/IMG20241103163852.jpg",
// });
// const response = await s3Client.send(command);
// console.log(response);

// =========================================== //

// const command = new GetObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "Snapchat-245241462.jpg",
// });
// const response = await s3Client.send(command);
// // const fileData = await response.Body.transformToString();
// const fileData = response.Body;
// // console.log(response.Body);
// const writeStream = createWriteStream("pic.jpg");
// fileData.pipe(writeStream)
// // fileData.on("data", (chunk) => {
// //   writeStream.write(chunk);
// // });

// =========================================== //

// const readStream = createReadStream("app.mjs");
// const command = new PutObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "files/app.js",
//   Body: readStream,
//   ContentType: "text/javascript",
// });
// const response = await s3Client.send(command);
// console.log(response);

// =========================================== //

// const command = new DeleteObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "images/",
// });
// const response = await s3Client.send(command);
// console.log(response);

// =========================================== //

// const command = new DeleteObjectsCommand({
//   Bucket: "myawsbucketforsta1",
//   Delete: {
//     Objects: [
//       { Key: "images/IMG20241103163738.jpg" },
//       { Key: "images/IMG20241103163852.jpg" },
//     ],
//   },
// });
// await s3Client.send(command);
// const command1 = new DeleteObjectCommand({
//   Bucket: "myawsbucketforsta1",
//   Key: "images/",
// });
// const response = await s3Client.send(command1);
// console.log(response);

// =========================================== //

// `https://myawsbucketforsta1.s3.amazonaws.com/app.js`;
