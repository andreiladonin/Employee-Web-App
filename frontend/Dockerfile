FROM node:alpine

WORKDIR /app

EXPOSE 5173

COPY package*json /app

RUN npm install

COPY . /app

CMD [ "npm", "run", "dev" ]