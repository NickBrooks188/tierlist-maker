

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

# RUN mkdir /client
# COPY . /client
# COPY package.json /client/package.json
# WORKDIR /client
# RUN npm install
# RUN npm run build

FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG DJANGO_APP
ARG DJANGO_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN python backend/manage.py makemigrations
RUN python backend/manage.py migrate
RUN python backend/manage.py loaddata seed
RUN python backend/manage.py runserver
# RUN python backend/manage.py collectstatic
# CMD gunicorn app:backend

FROM node:18-alpine
WORKDIR /tierlist
COPY tierlist/package.json tierlist/package-lock.json ./
COPY tierlist/app ./app
RUN npm install
COPY /tierlist .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]