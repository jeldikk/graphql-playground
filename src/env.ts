import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGO_URI: z.string(),
});

export const env = envSchema.parse(process.env);
