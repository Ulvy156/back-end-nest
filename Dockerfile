# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
#Copies the compiled JavaScript code (dist/) 
COPY --from=builder /app/dist ./dist 

#Copies package.json and package-lock.json from the build stage.
COPY --from=builder /app/package*.json ./

# Installs only production dependencies, skipping dev tools (like TypeScript, ESLint, testing libs).
RUN npm install --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
