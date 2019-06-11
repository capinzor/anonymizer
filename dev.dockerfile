# Image based on the official Node 10 image from dockerhub
FROM node:10.16.0

# Change directory so that commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Verify NPM cache
RUN npm cache verify

# Install dependencies
RUN npm install --quiet

