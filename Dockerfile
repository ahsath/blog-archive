# syntax=docker/dockerfile:1
FROM node:18-slim

ENV NODE_ENV=production

WORKDIR /app/

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build
RUN cd backend && npm i && npm run build 

EXPOSE 3000

CMD ["pnpm", "start"]