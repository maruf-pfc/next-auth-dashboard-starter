# ----------------------
# Stage 1: Build
# ----------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Enable and configure PNPM
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Copy all project files
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the Next.js project (supports TS out of the box)
RUN pnpm build

# ----------------------
# Stage 2: Production
# ----------------------
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Enable corepack & PNPM
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Install only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/.env.example ./.env.local

# Start the app
CMD ["pnpm", "start"]
