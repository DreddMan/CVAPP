FROM node:18-alpine3.16 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate


FROM nginx:alpine

