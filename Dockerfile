# Stage 1: Build the application
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Serve the application
FROM node:14-alpine
WORKDIR /app
RUN apk add --no-cache python3
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app /app
RUN chmod +x /app/public/apps/chmod_calculator/chmod_calculator.py
RUN chmod +x /app/public/apps/subnet_calculator/subnet_calculator.py
EXPOSE 3000

CMD ["node", "server.js"]
