FROM node:8.11

LABEL author=dipesh

ARG SERVICE_INVOICE

ENV DEBUG=reminder*
ENV SERVICE_INVOICE=$SERVICE_INVOICE

WORKDIR /data/app

COPY . .

RUN npm --version \
    && npm install \
    && npm run build

EXPOSE 3000

CMD ["npm", "start"]
