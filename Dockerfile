FROM node as xfa-converter
WORKDIR /app

#add resources
ADD package.json /app
ADD run_chrome.sh /app
ADD flatten.js /app
ADD run_flatten.sh /app

#install dependencies in app directory
RUN npm install -g pm2
RUN npm install --save html-pdf-chrome
RUN npm install
RUN chmod +x run_chrome.sh run_flatten.sh
#RUN mkdir -p output

#install chrome
RUN apt-get clean && apt-get update && apt-get -y upgrade && apt-get -y autoremove
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get -y install ./google-chrome-stable_current_amd64.deb
RUN ./run_chrome.sh

#clone mozilla pdf
RUN git clone https://github.com/mozilla/pdf.js.git
WORKDIR pdf.js
#/app/pdf.js/xfa
#RUN mkdir -p xfa

#install dependencies in pdf.js directory
RUN npm install -g gulp-cli
RUN npm install

EXPOSE 9222
ENTRYPOINT ["gulp","server"]

