FROM node:lts-alpine3.12 as build

WORKDIR /client
COPY ./client/package.json ./
COPY ./client/package-lock.json ./
RUN npm install
COPY ./client/ ./
RUN npm run build


FROM nginx:1.18.0-alpine

COPY ./webserver/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /client/build /usr/share/nginx/html