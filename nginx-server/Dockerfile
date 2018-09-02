FROM nginx

COPY dist/twitter/ /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d

CMD ["nginx", "-g","daemon off;"]