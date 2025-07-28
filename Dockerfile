# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Enable Corepack and activate PNPM
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Copy dependencies files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN pnpm build

# Stage 2: Production
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Enable Corepack and activate PNPM
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./

# Use Next.js built-in server
CMD ["pnpm", "start"]
