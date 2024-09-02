FROM php:8.3.9-apache
RUN apt update && apt upgrade -y
RUN docker-php-ext-install mysqli
#RUN a2enmod ssl
RUN /etc/init.d/apache2 restart

COPY ./public /var/www/html
COPY ./api /var/www/api

EXPOSE 80
#EXPOSE 443