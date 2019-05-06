FROM node:current-alpine
RUN apk add --no-cache git


# Create app directory
WORKDIR /usr/src/

RUN git clone https://github.com/TokenUnion/livepeerjs.git

WORKDIR /usr/src/livepeerjs

# COPY yarn.lock .

ENV NODE_ENV production

RUN npm install -g yarn
RUN yarn


EXPOSE 8000

CMD [ "node", "packages/graphql-sdk/server.js" ]
