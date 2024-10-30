FROM node:23-alpine3.19

WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000
