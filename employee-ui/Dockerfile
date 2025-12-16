# stage 1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# CAPTURE THE API URL FROM DOCKER COMPOSE

ARG REACT_APP_API_URL

# SET IT AS ENVIRONMENT VARIABLE FOR BUILD PROCESS

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# stage 2

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx" , "-g" , "daemon off;"]