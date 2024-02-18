# FROM node:14

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "node", "server.js" ]

FROM node

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["node","server.js"]

