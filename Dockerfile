FROM node:12.18-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . .
RUN npm run build 

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/projeto-prefeitura /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
