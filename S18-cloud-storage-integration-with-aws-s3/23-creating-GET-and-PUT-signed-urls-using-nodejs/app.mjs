import { getSignedS3Url } from "./urlSigner.mjs";

const signedUrl = getSignedS3Url({
  bucketName: "myawsbucketforsta1",
  objectKey: "Snapchat-690107645.jpg",
  method: "PUT",
  contentType: "image/jpg",
});

console.log(signedUrl);
