FROM python:3.12-alpine

ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY . /code/

RUN pip install "django~=5.0" djangorestframework==3.15.1 django-cors-headers==4.*

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"] 