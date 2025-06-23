FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of your app
COPY . .

# Expose your dev server port (Vite = 5173, React = 3000, etc.)
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]
