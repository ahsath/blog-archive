import path from "path";
import { join } from "path";
import { fileURLToPath } from "url";
import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function admin(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: join(__dirname, "..", "backend/dist/build"),
    prefix: "/admin",
    wildcard: false,
  });

  fastify.get("/admin*", (req, reply) => {
    reply.sendFile("index.html");
  });
}
