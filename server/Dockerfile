# Use lightweight Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Expose backend port
EXPOSE 5001

# Start in dev mode
CMD ["npm", "run", "dev"]
