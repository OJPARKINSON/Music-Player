FROM node:12.12.0-alpine  as base

WORKDIR /app

COPY package*.json ./ 

RUN npm install --only=production
RUN cp -R node_modules prod_modules
RUN npm install --silent

FROM base as build

WORKDIR /app

## Copy all the rest of the files from local so we can run compliation steps
COPY . .

RUN npm run build

## Release - The final layer, has only code & dependecies required for production
FROM node:12.12.0-alpine

WORKDIR /app

## Copy the previously set aside prod dependencies
COPY --from=base /app/prod_modules ./node_modules
## Copy the **built** distribution version of the code
COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public

# COPY --from=build /app/nb-config ./nb-config
COPY --from=build /app/package.json ./package.json

EXPOSE 5000

CMD ["npm", "run", "start"]