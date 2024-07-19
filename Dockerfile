FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Serve the application
FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules

COPY --from=builder /app /app

EXPOSE 8080
EXPOSE 3000

CMD ["node", "server.js"]
