import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "fs";

const s3Client = new S3Client({
  profile: "nodejs",
});

const readStream = createReadStream(
  "F:\\Movies & Series\\DRAMAS\\It's ok to not be okay\\Its.Okay.to.Not.Be.Okay.S01E02.720p.10bit.WEBRip.Hindi-Korean.x265.HEVC - Vegamovies.NL.mkv.webm"
);

const upload = new Upload({
  client: s3Client,
  params: {
    Bucket: "myawsbucketforsta1",
    Key: "movies/Its.Okay.to.Not.Be.Okay.S01E02.720p.10bit.WEBRip.Hindi-Korean.x265.HEVC - Vegamovies.NL.mkv.webm",
    Body: readStream,
    ContentType: "video/mp4",
  },
});

upload.on("httpUploadProgress", (pregress) => {
  process.stdout.write(
    `\r${Math.round((pregress.loaded / pregress.total) * 100)}%`
  );
});

const response = await upload.done();
console.log(response);
