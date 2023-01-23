import { createServer, ViteDevServer } from "vite";
import { JSDOM } from "jsdom";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Render } from "../src/entry-server";

const isProd = process.env.NODE_ENV === "production";

export interface RenderOpts {
  url: string;
  template: string;
  initialState?: {
    id: string;
    props: Record<string, unknown>;
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
let render$: Render = async () => "";
let dom: JSDOM;
let document: Document;
let apps: NodeListOf<HTMLElement>;

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

    dom = new JSDOM(template);
    document = dom.window.document;
    apps = document.querySelectorAll("[data-ssr]");

    if (!!apps.length) {
      for (let app of apps) {
        const state = opts.initialState?.find(
          (state) => state.id === app.dataset.ssr
        );

        app.innerHTML = await render$(app.dataset.ssrComponent, state?.props);
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
  fastify.decorateReply("render", render);
};

export default fp(fastifyVite);
