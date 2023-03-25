import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const preHandler: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorateRequest("baseState", null);

  fastify.addHook("preHandler", (req, _, done) => {
    const colorScheme = req.cookies.color_scheme;

    req.baseState = {
      colorScheme,
      state: { component: "TheHeader", data: { dark: colorScheme === "dark" } },
    };

    done();
  });

  done();
};

export default fp(preHandler);
