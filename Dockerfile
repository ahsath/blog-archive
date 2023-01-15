# syntax=docker/dockerfile:1
FROM node:18-slim

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY . .

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]