FROM node:18.0

ENV APP /jamty-frontend
RUN mkdir $APP
WORKDIR $APP
