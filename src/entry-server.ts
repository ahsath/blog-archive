import { createApp, type Data } from "./main";
import { renderToString, type SSRContext } from "vue/server-renderer";

export async function render(component: string, data: Data) {
  const app = createApp(component, data);

  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);

  return { html, teleports: ctx?.teleports };
}

export type Render = typeof render;
