FROM node:12-alpine AS build
ENV BUILD_STAGE 'buildtime'

WORKDIR /src/
COPY package*.json /src/
COPY *.config.js /src/
COPY pages /src/pages

RUN npm ci
RUN npm run build

FROM node:12-alpine
ENV BUILD_STAGE 'runtime'

WORKDIR /src/
COPY --from=build /src/package*.json /src/
COPY --from=build /src/*.config.js /src/
COPY --from=build /src/.nuxt /src/.nuxt

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

RUN npm ci --production

EXPOSE ${NUXT_PORT}
CMD npm start