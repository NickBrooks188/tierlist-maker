Use the official Node.js image as the base  
FROM node:alpine

# Set the working directory inside the container  
WORKDIR /tierlist

# Copy package.json and package-lock.json to the container  
COPY package.json ./

# Install dependencies  
RUN npm i  

# Copy the app source code to the container  
COPY . .  

# # Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on  
# EXPOSE 3000  

# Start the app  
CMD ["npm", "start"]  

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
