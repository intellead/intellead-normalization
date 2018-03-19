FROM node:8.6.0-alpine

WORKDIR /usr/src/intellead/intellead-normalization/app

COPY package.json ./

RUN apk update && \
    apk add python make g++ && \
    npm install --silent --progress=false --production

COPY app.js ./

COPY bin/ ./bin

COPY src/ ./src

EXPOSE 3000

CMD ["npm", "start"]
