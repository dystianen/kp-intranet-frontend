# develop stage
FROM node:16-slim
LABEL maintainer="infra-team@kelaspintar.co.id"
WORKDIR /app
COPY package.json ./
RUN npm i -g angular-http-server
COPY . .

RUN yarn

RUN yarn build

RUN ls dist/intranet

CMD ["angular-http-server","-p 8080","--path","dist/intranet"]

EXPOSE 8080
