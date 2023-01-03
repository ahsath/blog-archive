import { createServer, ViteDevServer } from "vite";
import { JSDOM } from "jsdom";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
// TODO: Add Render type into a declaration file
import { Render } from "../src/entry-server";

const isProd = process.env.NODE_ENV === "production";

declare global {
  interface DOMStringMap {
    ssrComponent: string;
  }
}

interface RenderOpts {
  url: string;
  template: string;
  initialState: {
    id: string;
    props: Record<string, unknown>;
  }[];
}

declare module "fastify" {
  interface FastifyReply {
    render: (opts: RenderOpts) => Promise<string | undefined>;
  }
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

    for (const app of apps) {
      if (app) {
        const state = opts.initialState.find(
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
    fastify.use(vite.middlewares);
  }
  fastify.decorateReply("render", render);
};

export default fp(fastifyVite);
