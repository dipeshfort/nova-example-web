FROM node:8.11

LABEL author=dipesh

WORKDIR /app

ENV NODE_ENV=production

COPY . .

RUN npm --version \
    & npm install --production

EXPOSE 5000

CMD ["npm", "start"]
