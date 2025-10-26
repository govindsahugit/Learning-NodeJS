import { z } from "zod/v4";

const schema = z
  .string("Please enter valid string")
  .min(3)
  .max(6)
  .startsWith("a");

const rawData = "a63153";

const result = schema.safeParse(rawData);

if (result.success) console.log(result.data);
else console.log(result.error.issues);

// try {
//   const validatedData = schema.parse(rawData);
//   console.log(validatedData);
// } catch (error) {
//   console.log(error.issues);
// }
