FROM php:7.2-apache

WORKDIR /var/www/html

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y git zip libzip-dev libssl-dev

ARG CURL_VERSION=7.79.1

RUN cd /tmp \
    && curl -LO https://curl.haxx.se/download/curl-${CURL_VERSION}.tar.gz \
    && tar -xvzf curl-${CURL_VERSION}.tar.gz \
    && cd curl-${CURL_VERSION} \
    && ./configure --with-openssl \
    && make \
    && rm -rf /usr/local/include/curl \
    && make install \
    && ldconfig \
    && rm -rf /tmp/curl-${CURL_VERSION}*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

COPY . .

USER root

RUN npm install

RUN composer install

RUN mkdir -p /var/www/html/public/build
RUN chown -R www-data:www-data /var/www

RUN npm run build

COPY ./000-default.conf /etc/apache2/sites-available/

RUN a2enmod rewrite

RUN service apache2 restart

EXPOSE 80 443