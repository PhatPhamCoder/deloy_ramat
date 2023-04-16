FROM node:18-alpine

WORKDIR /usr/backend-ramat

COPY package*.json ./

RUN npm install

RUN npm audit fix

COPY . .

EXPOSE 5000
CMD [ "node", "start"]