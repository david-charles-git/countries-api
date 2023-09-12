# Use an official Node.js 14 image as the base
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy the rest of the application distribution code to the container
COPY ./dist ./dist

# Expose the desired port
EXPOSE 5000

# Start the app
CMD ["yarn", "start"]
