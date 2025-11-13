import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

// const s3Client = new S3Client();
// OR
// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "AKIAUHODB34SUMIUTBA2",
//     secretAccessKey: "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",
//   },
// });
// OR
const s3Client = new S3Client({
  profile: "nodejs",
});

const listBucketsCommand = new ListBucketsCommand();
const res = await s3Client.send(listBucketsCommand);
console.log(res);
