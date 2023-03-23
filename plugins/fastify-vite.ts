import { createServer, ViteDevServer } from "vite";
import { JSDOM } from "jsdom";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Render } from "../src/entry-server";
import { Data } from "../src/main";

const isProd = process.env.NODE_ENV === "production";

export interface RenderOpts {
  url: string;
  template: string;
  initialState?: {
    component: string;
    data: Data;
  }[];
}

let vite: ViteDevServer;

if (!isProd) {
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
}

let template = "";
let render$: Render;

async function render(opts: RenderOpts) {
  try {
    if (isProd) {
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

const fastifyVite: FastifyPluginAsync = async (fastify) => {
  if (!isProd) {
    // use vite's connect instance as middleware
    // https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
    fastify.use(vite.middlewares);
  }
  fastify.decorate("render", render);
};

export default fp(fastifyVite);
