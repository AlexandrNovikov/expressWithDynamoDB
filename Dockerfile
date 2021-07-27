FROM node:14

WORKDIR /app

COPY . .

RUN npm i
RUN npm i -g serverless

EXPOSE 3000