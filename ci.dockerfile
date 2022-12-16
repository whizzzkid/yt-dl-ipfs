FROM node:18-alpine

ENV PYTHONUNBUFFERED=1
ENV NODE_NO_WARNINGS=1
ENV PLAYER_PATH="https://yt-dl-ipfs.live/"
ENV IPFS_API_URL="http://host.docker.internal:5001"
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip

# Copy the rest of the files
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY ./dist/index.js ./dist/index.js

CMD [ "npm", "--silent", "start" ]
