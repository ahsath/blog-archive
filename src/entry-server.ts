import { createApp, Props } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(component: string, props: Props) {
  const app = createApp(component, props);

  const ctx = {};
  const html = await renderToString(app, ctx);

  return html;
}

export type Render = typeof render;
