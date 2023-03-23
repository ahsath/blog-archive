import type { RenderOpts } from "../plugins/fastify-vite";
import type { Data } from "../src/main";

declare module "fastify" {
  interface FastifyInstance {
    render: (opts: RenderOpts) => Promise<string | undefined>;
    getTemplatePath: (template?: string) => string;
  }
}

declare global {
  interface DOMStringMap {
    ssrComponent: string;
  }

  interface Window {
    __PRELOADED_STATE__?: {
      component: string;
      data: Data;
    }[];
  }
}
