# Install dependencies only when needed
FROM node:19-alpine AS deps

WORKDIR /app

#RUN apt-get update && apt-get install -y openssl
RUN apk add --no-cache libc6-compat openssl


COPY package-lock.json package.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/package.json
# TODO https://darekkay.com/blog/storybook-separate-folder/
# Only install apps/web dependencies
RUN npm -w @mec/web ci \
    && npm -w @mec/web run modclean:root \
    && npm -w @mec/web run modclean

# Rebuild the source code only when needed
FROM node:19-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/apps/web/node_modules/ ./apps/web/node_modules/

# Here dependencies and unneeded files are skiped thanks to .dockerignore file
COPY package-lock.json package.json tsconfig.json ./
COPY apps/web ./apps/web

RUN npm -w @mec/web run setup:dsfr \
    && npm -w @mec/web run prisma:generate \
    && npm -w @mec/web run build \
    && npm -w @mec/web prune --omit=dev

# Production image, copy all the files and run next
FROM node:19-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

ENV PORT 8080
ENV NODE_ENV production

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

CMD ["npm", "run", "start:web"]
