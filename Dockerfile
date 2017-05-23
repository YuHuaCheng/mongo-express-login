FROM node:latest

ADD . /mongoExpress
WORKDIR /mongoExpress

RUN npm install -g nodemon
RUN npm install

EXPOSE 3000
EXPOSE 27017

CMD npm start