# syntax=docker/dockerfile:1
FROM node:18-slim

WORKDIR /app/

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]