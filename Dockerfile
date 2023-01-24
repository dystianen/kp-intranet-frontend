# develop stage
FROM node:16-slim


LABEL maintainer="infra-team@kelaspintar.co.id"
WORKDIR /app
COPY package.json ./
RUN npm i -g angular-http-server
COPY . .

RUN yarn install


RUN yarn build --configuration=production
RUN ls dist/intranet

CMD ["angular-http-server","-p 8080","--path","dist/intranet"]

EXPOSE 8080
