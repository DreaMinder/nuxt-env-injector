FROM node:12-alpine AS build

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

WORKDIR /src/
COPY package*.json /src/
COPY *.config.js /src/
COPY pages /src/pages

RUN npm ci
RUN npm run build

FROM node:12-alpine

WORKDIR /src/
COPY --from=build /src/package*.json /src/
COPY --from=build /src/*.config.js /src/
COPY --from=build /src/.nuxt /src/.nuxt

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV ENV_TYPE 'injected-on-runtime-inside-of-dockerfile'

RUN npm ci --production

EXPOSE ${NUXT_PORT}
CMD npm start