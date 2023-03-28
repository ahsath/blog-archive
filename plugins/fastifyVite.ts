import { createServer, ViteDevServer } from "vite";
import { JSDOM } from "jsdom";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import type { Render } from "../src/entry-server";
import type { Data } from "../src/main";
import { PROD } from "../constants/index.js";

export interface RenderOpts {
  url: string;
  template: string;
  initialState?: {
    component: string;
    data: Data;
  }[];
}

let vite: ViteDevServer;

if (!PROD) {
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
}

let template = "";
let render$: Render;

async function render(opts: RenderOpts) {
  try {
    if (PROD) {
      // @ts-ignore
      render$ = (await import("../dist/server/entry-server.js")).render;
      template = opts.template;
    } else {
      render$ = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      template = await vite.transformIndexHtml(opts.url, opts.template);
    }

    const dom = new JSDOM(template);
    const document = dom.window.document;
    const apps = document.querySelectorAll("[data-ssr-component]") as NodeListOf<HTMLElement>;

    if (!!apps.length) {
      for (let app of apps) {
        const state = opts.initialState?.find(
          (state) => state.component === app.dataset.ssrComponent
        );

        const { html, teleports } = await render$(app.dataset.ssrComponent, state?.data);

        app.innerHTML = html;

        if (teleports) {
          for (const selector in teleports) {
            const teleport = document.querySelector(selector) as Element;
            teleport.innerHTML = teleports[selector];
          }
        }
      }
    }

    template = dom.serialize();
    return template;
  } catch (error) {
    // TODO: Handle error with fastify
    console.log(error);
    vite && vite.ssrFixStacktrace(error as Error);
  }
}

const fastifyVite: FastifyPluginCallback = (fastify, opts, done) => {
  if (!PROD) {
    // use vite's connect instance as middleware
    // https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
    fastify.use(vite.middlewares);
  }
  fastify.decorate("render", render);
  done();
};

export default fp(fastifyVite);
