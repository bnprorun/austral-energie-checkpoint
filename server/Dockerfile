# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine as production
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install 
RUN npm install -g nodemon
# ==== RUN =======
# Set the env to "production"
EXPOSE 3000
# Start nginx
CMD ["npm", "start"]
# # Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000
