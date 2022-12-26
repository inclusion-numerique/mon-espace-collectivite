FROM node:19-slim as base

WORKDIR /app
RUN apt-get update && apt-get install -y openssl
RUN npm install -g pnpm


# Install dependencies only when needed
FROM base as deps

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install \
  --filter @mec/web \
  --virtual-store-dir apps/web/node_modules/.pnpm \
  --link-workspace-packages copy

# Rebuild the source code only when needed
FROM base as builder

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/apps/web/node_modules/ ./apps/web/node_modules/

# Here dependencies and unneeded files are skiped thanks to .dockerignore file
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json ./
COPY apps/web ./apps/web

RUN pnpm -F @mec/web setup:dsfrc
RUN pnpm -F @mec/web prisma:generate
RUN pnpm -F @mec/web build
# RUN pnpm -F @mec/web prune --omit=dev

# Production image, copy all the files and run next
FROM base AS runner

ENV PORT 8080
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 webgroup \
    && adduser --system --uid 1001 webuser

# FIXME prod build 404 on every app pages without copying all src but should not ...
COPY --from=builder --chown=webuser:webgroup /app ./

# Copy deps
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/node_modules ./node_modules

# TODO Use this with next version when app dir is supported
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/.next/standalone ./
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/.next/static ./.next/static

# Copy build
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/.next ./.next

# Copy package.json copied from .next
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/package.json ./package.json

# Copy public assets
#COPY --from=builder --chown=webuser:webgroup /app/apps/web/public ./public

USER webuser

EXPOSE $PORT

CMD ["pnpm", "start:web"]
