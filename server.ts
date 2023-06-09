import path from "path";
import { fileURLToPath } from "url";
import Fastify from "fastify";
import view from "@fastify/view";
import cookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static";
import { Liquid } from "liquidjs";
import fastifyVite from "./plugins/fastifyVite.js";
import preHandler from "./plugins/preHandler.js";
import { PROD } from "./constants/index.js";
import getTemplatePath from "./decorators/getTemplatePath.js";
import blog from "./routes/blog.js";
import admin from "./routes/admin.js";

const fastify = Fastify({ logger: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// plugins (from the Fastify ecosystem)
fastify.register(view, {
  engine: {
    liquid: new Liquid({
      root: getTemplatePath(),
      extname: ".html",
    }),
  },
});

if (PROD) {
  // TODO: add helmet, env vars, etag, compression
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "dist/client"),
    prefixAvoidTrailingSlash: true,
  });
} else {
  // TODO: add documentation for this
  fastify.register(import("@fastify/middie"));
}

fastify.register(cookie);

// your plugins (your custom plugins)
fastify.register(fastifyVite);
fastify.register(preHandler);

fastify.register(blog);
fastify.register(admin);

// decorators
fastify.decorate(getTemplatePath.name, getTemplatePath);

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
