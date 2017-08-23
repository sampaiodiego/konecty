FROM node:4.8

ADD . /app

RUN set -x \
  && cd /app/bundle/programs/server/ \
  && npm install \
  && npm cache clear

WORKDIR /app/bundle

ENV PORT=3000 \
    ROOT_URL=http://localhost:3000

EXPOSE 3000

CMD ["node", "main.js"]
