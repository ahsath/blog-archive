import { FastifyInstance } from "fastify";

export default async function blog(fastify: FastifyInstance) {
  fastify.get("/", async (req, reply) => {
    const initialState = [req.baseState.state];

    try {
      let template = await fastify.view(fastify.getTemplatePath("index.html"), {
        initialState,
        colorScheme: req.baseState.colorScheme,
      });

      template = await fastify.render({
        template,
        initialState,
        url: req.url,
      });

      await reply.status(200).header("Content-Type", "text/html").send(template);
    } catch (e) {
      console.error(e);
    }
  });
}
