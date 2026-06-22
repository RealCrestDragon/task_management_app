FROM node:22-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["dumb-init", "node", "dist/src/main.js"]