import type { RenderOpts } from "../plugins/fastifyVite";
import type { Data } from "../src/main";

declare module "fastify" {
  interface FastifyInstance {
    render: (opts: RenderOpts) => Promise<string>;
    getTemplatePath: (template?: string) => string;
  }

  interface FastifyRequest {
    baseState: {
      colorScheme: string | undefined;
      state: {
        component: string;
        data: Data;
      };
    };
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
