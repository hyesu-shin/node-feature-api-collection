FROM node:22.11.0

WORKDIR /server

COPY . .

ENV   HOST 0.0.0.0

EXPOSE 8002

CMD ["npm", "run", "start"]