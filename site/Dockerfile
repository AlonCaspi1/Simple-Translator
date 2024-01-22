FROM node:14

WORKDIR /app

RUN npm install
RUN npm install express
RUN npm install request
RUN npm install mysql
RUN npm install path
RUN npm install dotenv

COPY . .
COPY ../Docker/.env .

EXPOSE 3000

CMD ["node", "server.js"]
