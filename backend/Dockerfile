# Backend Dockerfile

FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the entire project
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "src/index.js"]
