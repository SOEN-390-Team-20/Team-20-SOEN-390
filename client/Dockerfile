FROM node:17-alpine3.14

WORKDIR /app

# Give user "app" permissions
RUN addgroup app && adduser -S -G app app && chown -R app /app

# Switch to user "app"
USER app

# Copy just package.json
COPY package.json /app

# Install the packages
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
  fi

# Copy over the rest of the files
COPY . ./ 

ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "start"]