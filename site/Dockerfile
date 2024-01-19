FROM node:14

WORKDIR /app

RUN npm install
RUN npm install express
RUN npm install request

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
