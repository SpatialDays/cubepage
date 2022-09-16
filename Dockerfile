FROM node:10.24
RUN mkdir /app
COPY . /app/
EXPOSE 3000
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm install -g serve@10.1.1
CMD ["serve", "-s", "build", "-l", "3000"]
