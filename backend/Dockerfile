FROM python:alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app

COPY requirements.txt /app

EXPOSE 8000
# Build psycopg2-binary from source -- add required required dependencies
RUN pip install -r requirements.txt

COPY . /app

CMD  [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]