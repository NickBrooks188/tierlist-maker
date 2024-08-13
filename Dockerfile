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
ARG NEXT_PUBLIC_BACKEND_URL
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
COPY frontend/app ./app
RUN npm install
COPY /frontend .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# RUN python backend/manage.py makemigrations
# RUN python backend/manage.py migrate
# RUN python backend/manage.py loaddata seed