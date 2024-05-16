FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm uninstall pigpio

RUN wget https://github.com/joan2937/pigpio/archive/master.zip \
    && unzip master.zip \
    && cd pigpio-master \
    && make \
    && make install

RUN npm install pigpio

RUN npm rebuild

COPY . .

CMD ["npm", "run", "start:dev"]


