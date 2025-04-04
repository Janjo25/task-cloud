FROM node:22.14.0-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/storage/profile-avatars && mkdir -p /app/storage/user-files

EXPOSE 3000

CMD ["npm", "start"]
