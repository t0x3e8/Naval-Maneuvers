# Use a Node.js base image
FROM node:14 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies, including 'devDependencies' for the build
RUN npm install

# Copy webpack configuration files and babel configuration
COPY webpack.config.js ./
COPY .babelrc ./

# Copy the source code directory into the Docker image
COPY src/ ./src/

# Build the app for production
RUN npm run build:prod

# Start a new stage from scratch for a lightweight production image
FROM nginx:stable-alpine as production-stage

# Copy the built dist folder from the build-stage to the nginx serve directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the port nginx is reachable on
EXPOSE 80

# Start nginx with the global daemon off
CMD ["nginx", "-g", "daemon off;"]
