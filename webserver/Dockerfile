FROM node:lts-alpine3.12 as build

WORKDIR /usr/src/app

COPY ./client/package.json ./
COPY ./client/package-lock.json ./

RUN npm install

COPY ./client/ ./

RUN npm run build

FROM nginx:1.18.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY /webserver/nginx.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/build /usr/share/nginx/html
