# Frontend Dockerfile

FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the entire project
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
