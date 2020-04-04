FROM node:12

WORKDIR /NewIMG


COPY package*.json ./


RUN npm install

COPY . .

CMD ["npm", "start"]

