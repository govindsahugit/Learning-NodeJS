import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

const privateKey = process.env.CLOUDFRONT_PRIVATE_KEY;
const keyPairId = "K3IRP14W5U92UZ";
const dateLessThan = new Date(Date.now() + 1000 * 60 * 60).toISOString();

const distributionName = `https://d3eoxekdhp4lto.cloudfront.net`;

export const generateCloudFrontSignedUrl = ({
  Key,
  download = false,
  filename,
}) => {
  const url = `${distributionName}/${Key}?response-content-disposition=${encodeURIComponent(
    `${download ? "attachment" : "inline"}; filename=${filename}`
  )}`;
  const signedUrl = getSignedUrl({
    url,
    keyPairId,
    dateLessThan,
    privateKey,
  });
  return signedUrl;
};
