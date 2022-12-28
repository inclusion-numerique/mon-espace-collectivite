# This docker file is used to build an image
# to run playwright e2e tests on Circle CI
# without having to install dependencies each time
FROM cimg/node:19.3.0 as base

RUN sudo npx playwright install-deps
RUN npx playwright install
