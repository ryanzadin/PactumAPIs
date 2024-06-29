FROM pactumjs/flows:latest

WORKDIR /home/pactumjs/

COPY . /home/pactumjs/

RUN npm install

CMD [ "npm","run","test:contractProductP"]