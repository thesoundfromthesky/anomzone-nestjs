# Development Stage
FROM node:12.19 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN NODE_ENV=development && npm install

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN if [ "$NODE_ENV" = "development" ]; \
    then echo "Development Beginning";  \
    elif [ "$NODE_ENV" = "local" ]; \
    then npm run build anomzone -- --configuration=production,local && npm run build anomzone-api -- --prod; \
    elif [ "$NODE_ENV" = "production" ]; \ 
    then npm run build anomzone -- --prod && npm run build anomzone-api -- --prod; \
    else \
    echo "NODE_ENV is ${NODE_ENV}"; \
    fi;

# Production Stage
FROM node:12.19-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/anomzone-api/main"]