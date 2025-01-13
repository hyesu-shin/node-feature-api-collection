FROM node:22.11.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0
ENV PORT 8002

EXPOSE 8002

CMD ["npm", "run", "start"]