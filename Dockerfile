# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:10.5 as build-stage

# build-time variables
# prod|sandbox its value will be come from outside
ARG env=prod

RUN apk update && apk add --no-cache make git

# Move our files into directory name "app"
WORKDIR /app
COPY package.json package-lock.json  /app/
RUN npm install @angular/cli@6.0.8 -g
RUN cd /app && npm install
COPY .  /app

# Build with $env variable from outside
RUN cd /app && npm run build:$env

# Build a small nginx image with static website
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app-repo /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
