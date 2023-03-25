import path from "path";
import { PROD } from "../constants/index.js";

export default function getTemplatePath(template: string = "") {
  return PROD ? path.join("dist/client/templates", template) : path.join("templates", template);
}
