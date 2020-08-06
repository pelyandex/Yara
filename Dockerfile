FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run development-docker
FROM nginx:1.17.10-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY nginx/cert.key etc/nginx/cert.key
COPY nginx/cert.pem etc/nginx/cert.pem
COPY --from=builder /app/dist /app/dist
EXPOSE 80:80
EXPOSE 443:443