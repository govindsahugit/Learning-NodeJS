import fs from "fs/promises";

const a = await fs.readFile(
  "F:\\Movies & Series\\Animation\\Rio 1,2\\Rio.2011.BRRip.720p.Dual Audio [Eng-Hindi]~Harshad.mkv"
);
const b = await fs.readFile(
  "F:\\Movies & Series\\Animation\\Moana.2.2024.1080p.10Bit.BluRay.Hindi.5.1-English.5.1.HEVC.x265-HDHub4u.Ms.mkv"
);
const c = await fs.readFile("F:\\Movies & Series\\Bollywood\\Hey.Sinamika.mp4");

console.log(a.byteLength);
console.log(b.byteLength);
console.log(c.byteLength);

console.log("END");
