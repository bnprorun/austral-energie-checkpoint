# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# # Expose the port on which the app will be running (3000 is the default that `serve` uses)
# EXPOSE 3000

FROM node:18-alpine as production
ENV NODE_ENV production
RUN npm install -g serve
# Copy built assets from `builder` image
COPY --from=builder /app/build ./build
# Add your nginx.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["serve", "-s","build"]