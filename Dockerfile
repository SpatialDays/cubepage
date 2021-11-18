FROM node:10.24
RUN mkdir /app
COPY . /app/
EXPOSE 3000
WORKDIR /app
RUN npm install
CMD npm run start
