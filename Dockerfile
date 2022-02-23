FROM node:lts-alpine
WORKDIR /app

COPY [".env", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . ./
EXPOSE 3001
RUN chown -R node /app
USER node
CMD ["npm", "run", "start:build"]
