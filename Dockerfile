FROM node:18-alpine

# Install tools for waiting and running psql
RUN apk add --no-cache bash postgresql-client netcat-openbsd

WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# copy app
COPY . .

RUN chmod +x ./scripts/migrate-and-start.sh || true

EXPOSE 4000

CMD ["./scripts/migrate-and-start.sh"]
