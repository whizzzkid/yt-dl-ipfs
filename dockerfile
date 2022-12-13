FROM node:18-alpine

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip

COPY . .
RUN npm ci && npm run build
RUN rm -rf src

CMD [ "npm", "--silent", "start" ]
