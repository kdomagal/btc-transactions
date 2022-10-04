FROM arm64v8/node:16-alpine

WORKDIR /usr/srv/app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["node", "app.js"]