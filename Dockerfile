FROM node:14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./

RUN npm install

# Copying source files
COPY . .

#ENV MONGO_URL "mongodb://mongo:17023"
#ENV DB_NAME points
#ENV COL_NAME dataPoints

# Building app
RUN npm run build

CMD ["npm", "run", "dev"]

EXPOSE 3000