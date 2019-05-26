FROM node:10.15.0
ENV NPM_CONFIG_LOGLEVEL warn
COPY . .
RUN npm run build
RUN npm install -g serve
CMD serve -s target
EXPOSE 3221
