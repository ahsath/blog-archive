# syntax=docker/dockerfile:1
FROM node:18-slim

WORKDIR /app/

COPY . .

RUN npm i -g pnpm && pnpm i && pnpm build
RUN cd backend && yarn && NODE_ENV=production APP_URL=https://octopus-app-9xbn2.ondigitalocean.app yarn build

EXPOSE 3000

CMD ["pnpm", "start"]