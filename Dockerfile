# FROM python:3.9.18-alpine3.18
# RUN apk add build-base
# RUN apk add postgresql-dev gcc python3-dev musl-dev
# ARG DJANGO_APP
# ARG DJANGO_ENV
# ARG DATABASE_URL
# ARG SCHEMA
# ARG SECRET_KEY
# WORKDIR /api
# COPY requirements.txt .
# RUN pip install -r requirements.txt
# RUN pip install psycopg2
# COPY . .
# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM node:18-alpine
WORKDIR /tierlist
COPY tierlist/package.json tierlist/package-lock.json ./
COPY tierlist/app ./app
RUN npm install
COPY /tierlist .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# RUN python backend/manage.py makemigrations
# RUN python backend/manage.py migrate
# RUN python backend/manage.py loaddata seed