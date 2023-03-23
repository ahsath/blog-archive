import path from "path";
import { PROD } from "../constants/index.js";

export const getTemplatePath = (template: string = "") =>
  PROD ? path.join("dist/client/templates", template) : path.join("templates", template);
