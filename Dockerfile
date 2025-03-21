
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

# Use lightweight nginx image
FROM nginx:alpine AS runner

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
