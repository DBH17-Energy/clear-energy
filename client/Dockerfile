FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g angular-cli

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 4200
EXPOSE 49153
