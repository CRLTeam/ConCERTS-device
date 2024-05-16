FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# install dependencies
RUN npm install

RUN npm uninstall pigpio

# download latest pigpio source code, unzip it, build and install it
RUN wget https://github.com/joan2937/pigpio/archive/master.zip \
    && unzip master.zip \
    && cd pigpio-master \
    && make \
    && make install

# reinstall node pigpio package
RUN npm install pigpio

RUN npm rebuild

COPY . .

# run application in development mode
CMD ["npm", "run", "start:dev"]


