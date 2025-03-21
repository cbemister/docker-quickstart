
# Base on official Node.js Alpine image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Use lightweight Caddy image
FROM caddy:2-alpine AS runner

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/caddy

# Copy custom Caddy config
COPY ./Caddyfile /etc/caddy/Caddyfile

# Expose port
EXPOSE 80

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
