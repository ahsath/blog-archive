import { fileURLToPath } from "url";
import path from "path";

export const PROD = process.env.NODE_ENV === "production";
export const __dirname = path.dirname(fileURLToPath(import.meta.url));
