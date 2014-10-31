FROM debian:writeon

RUN apt-get update
RUN apt-get upgrade -yq
RUN apt-get install -yq git nodejs-legacy npm
RUN git clone https://github.com/BeardandFedora/WriteOn.git

WORKDIR writeon
RUN npm install
RUN node_modules/bower/bin/bower install --allow-root --production --config.interactive=false
CMD nodejs server.js

EXPOSE 3000
