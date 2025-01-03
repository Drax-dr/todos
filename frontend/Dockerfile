# Build the app in a Node.js image
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the build files to the nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 3000
