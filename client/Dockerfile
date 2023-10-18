FROM node:18-alpine

WORKDIR /client

COPY package.json /client/

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]