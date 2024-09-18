# this also build on top of linux image
FROM node:18 AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and pakcage-lock.json into the working directory
COPY package*.json ./

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Install any needed packages specified in package.json
RUN npm install

# Copy app source inside the docker image
COPY . .

# Make port 3000 availabele outside this conatianer
EXPOSE 3000

# Dfine the commmand to run your app using CMD (only one CMD allowed)
CMD [ "npm","start" ]