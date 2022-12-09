ARG PORT=3000

# Install dependencies only when needed
FROM node:19-slim AS deps

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

# Install pnpm
#RUN wget "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -O /bin/pnpm; chmod +x /bin/pnpm;

COPY yarn.lock package.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/package.json

RUN yarn install --ignore-engines --frozen-lockfile


# Rebuild the source code only when needed
FROM node:19-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl jq

# Install pnpm
#RUN wget "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -O /bin/pnpm; chmod +x /bin/pnpm;

#COPY --from=deps /root/.local/share/pnpm/store/v3 /root/.local/share/pnpm/store/v3
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/apps/web/node_modules/ ./apps/web/node_modules/

# Here dependencies and unneeded files are skiped thanks to .dockerignore file
COPY package.json tsconfig.json ./
COPY apps/web ./apps/web

RUN yarn workspace @mec/web setup:dsfr
RUN yarn workspace @mec/web prisma:generate
RUN yarn workspace @mec/web modclean
RUN yarn workspace @mec/web build

# Remove dev dependencies for lighter prod image
# https://github.com/yarnpkg/yarn/issues/696#issuecomment-462014673
# RUN yarn workspace @mec/web remove $(cat apps/web/package.json | jq -r '.devDependencies | keys | join(" ")') --ignore-engines
RUN cd apps/web && npm prune --omit-dev


# Production image, copy all the files and run next
FROM node:19-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

ENV NODE_ENV production

RUN addgroup --system --gid 1001 webgroup
RUN adduser --system --uid 1001 webuser

# FIXME prod build 404 on every app pages trying to copy all sources but should not ...
COPY --from=builder --chown=webuser:webgroup /app/apps/web ./

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

CMD ["yarn", "start"]
