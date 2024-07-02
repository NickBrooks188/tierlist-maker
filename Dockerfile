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

RUN python manage.py make migrations
RUN python manage.py migrate
RUN python manage.py loaddata seed
RUN python manage.py collectstatic
CMD gunicorn app:app