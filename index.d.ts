import { RenderOpts } from "./plugins/fastify-vite";

declare module "fastify" {
  interface FastifyReply {
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
      id: string;
      props: Record<string, unknown>;
    }[];
  }
}
