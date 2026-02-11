#!/bin/sh
set -e

echo "Waiting for Postgres at $DB_HOST:$DB_PORT..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  sleep 1
done

echo "Postgres is up — applying migrations"
if [ -f migrations/001_create_tables.sql ]; then
  PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$DB_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f migrations/001_create_tables.sql || true
else
  echo "No migration file found at migrations/001_create_tables.sql"
fi

echo "Starting API"
node src/app.js
