FROM node:8.11

LABEL author=dipesh

ARG SERVICE_REMINDER_API

ENV DEBUG=reminder*
ENV SERVICE_REMINDER_API=$SERVICE_REMINDER_API

WORKDIR /data/app

COPY . .

RUN npm --version \
    && npm run build

EXPOSE 3000

CMD ["npm", "start"]
