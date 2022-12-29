# This Dockerfile assumes that a working build of next webapp
# is located in apps/web/dist
# See circle ci config build_web job for more info on the build process
FROM node:19.3.0-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

ENV PORT 8080
ENV NODE_ENV production

RUN addgroup --system --gid 1001 webgroup \
    && adduser --system --uid 1001 webuser

COPY --chown=webuser:webgroup apps/web/dist/node_modules/ ./node_modules/
COPY --chown=webuser:webgroup apps/web/dist/web/node_modules/ ./web/node_modules/
COPY --chown=webuser:webgroup apps/web/dist/web/server/ ./web/server/

USER webuser

EXPOSE $PORT

CMD ["node", "server/server.js"]
