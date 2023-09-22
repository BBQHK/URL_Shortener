# Use an official Node.js runtime as a parent image
FROM node:20.7

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the container
EXPOSE 3000

# Start the server
CMD ["npm", "start"]


# docker build -t url-shortener-frontend .
# docker run -p 3000:3000 --name node-frontend --link python-backend url-shortener-frontend