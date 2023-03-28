import { join } from "path";
import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import { __dirname } from "../constants/index.js";

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
