FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npx nx reset
RUN npx prisma generate

CMD ["npm", "run", "start", "front"]
