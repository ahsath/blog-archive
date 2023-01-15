import path from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import view from "@fastify/view";
import { Liquid } from "liquidjs";
import fastifyStatic from "@fastify/static";
import fastifyVite from "./plugins/fastify-vite.js";

// TODO: move this to a declaration file
declare module "fastify" {
  interface FastifyReply {
    getTemplatePath: (template?: string) => string;
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

const fastify = Fastify({ logger: true });

const getTemplatePath = (template: string = "") =>
  isProd
    ? path.join("dist/client/templates", template)
    : path.join("templates", template);

fastify.decorateReply(getTemplatePath.name, getTemplatePath);

fastify.register(view, {
  engine: {
    liquid: new Liquid({
      root: getTemplatePath(),
      extname: ".html",
    }),
  },
});

if (isProd) {
  // TODO: add helmet, env vars, etag, compression
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "dist/client"),
    prefixAvoidTrailingSlash: true,
  });
} else {
  // TODO: add documentation for this
  fastify.register(import("@fastify/middie"));
}

fastify.register(fastifyVite);

fastify.get("/", async (request, reply) => {
  const initialState = [{ id: "counter", props: { count: 24 } }];

  try {
    let template: string | undefined = await fastify.view(
      reply.getTemplatePath("counter.html"),
      { initialState }
    );

    template = await reply.render({
      url: request.url,
      template,
      initialState,
    });

    reply.status(200).header("Content-Type", "text/html").send(template);
  } catch (e) {
    console.error(e);
  }
});

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
