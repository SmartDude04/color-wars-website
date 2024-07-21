FROM php:8.3.9-apache
#RUN apt update && apt upgrade -y
RUN docker-php-ext-install mysqli

COPY ./public /var/www/html
COPY ./api /var/www/api
COPY public/fonts /var/www/fonts

EXPOSE 80