FROM node:6

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

RUN npm install -g grunt

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

RUN grunt build