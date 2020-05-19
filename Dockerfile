FROM node:12.1-alpine
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
USER node
COPY --chown=node:node . .
RUN npm install
ENV DB=$DB
ENV DB_NM=$DB_NM
EXPOSE 3000
CMD ["npm","run","start"]
