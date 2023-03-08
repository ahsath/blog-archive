import { createApp, Props } from "./main";
import { renderToString, type SSRContext } from "vue/server-renderer";

export async function render(component: string, props: Props) {
  const app = createApp(component, props);

  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);

  return { html, teleports: ctx?.teleports };
}

export type Render = typeof render;
