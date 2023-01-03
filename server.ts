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

fastify.decorateReply("getTemplatePath", getTemplatePath);

fastify.register(view, {
  engine: {
    liquid: new Liquid({
      root: getTemplatePath(),
      extname: ".html",
    }),
  },
});

fastify.register(fastifyVite);

if (isProd) {
  // TODO: add helmet, env vars, etag, compression
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "dist/client"),
    prefixAvoidTrailingSlash: true,
  });
} else {
  fastify.register(import("@fastify/middie"));
}

fastify.get("/", async (request, reply) => {
  try {
    const initialState = [
      {
        id: "posts",
        props: {
          posts: [
            { id: "1", title: "testing the waters", image: "an image link" },
            {
              id: "2",
              title: "Avatar: The Way of the Water",
              image: "hero image",
            },
          ],
        },
      },
    ];

    let template: string | undefined = await fastify.view(
      reply.getTemplatePath("blog.html"),
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
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
