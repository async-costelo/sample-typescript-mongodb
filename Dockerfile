FROM node:latest
# Create app dir
WORKDIR /src/app
# install app dependencies
COPY ./package.json ./

RUN npm install typescript -g
RUN npm install

# copy app source code
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "watch" ]

# this is a comment
