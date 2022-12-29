# This Dockerfile assumes that a working build of next webapp
# is located in apps/web/dist

FROM node:19.3.0-slim as base

WORKDIR /app
RUN apt-get update && apt-get install -y openssl


# Install dependencies only when needed
FROM base as deps

WORKDIR /app

COPY apps/web/dist/node_modules/ ./node_modules/

# Production image, copy all the files and run next
FROM deps AS runner

ENV PORT 8080
ENV NODE_ENV production

RUN addgroup --system --gid 1001 webgroup \
    && adduser --system --uid 1001 webuser

COPY --from=deps --chown=webuser:webgroup /app/node_modules/ ./node_modules/
COPY --chown=webuser:webgroup apps/web/dist/server/ ./server/

USER webuser

EXPOSE $PORT

CMD ["node", "app/server.js"]
