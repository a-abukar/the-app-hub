# Stage 1: Build the application
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Serve the application
FROM node:14-alpine

WORKDIR /app

# Install Python
RUN apk add --no-cache python3

# Copy the node_modules from the builder stage
COPY --from=builder /app/node_modules /app/node_modules

# Copy the entire app from the builder stage
COPY --from=builder /app /app

# Ensure Python scripts are executable
RUN chmod +x /app/public/apps/chmod_calculator/chmod_calculator.py
RUN chmod +x /app/public/apps/subnet_calculator/subnet_calculator.py

# Expose the port the app runs on
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
