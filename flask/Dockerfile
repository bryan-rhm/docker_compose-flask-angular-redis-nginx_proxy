FROM python:3


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN pip install flask redis flask-cors

COPY ./api/app.py /usr/src/app

EXPOSE 5000

CMD [ "python", "./app.py" ]