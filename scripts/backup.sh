#!/bin/sh
set -eu
mkdir -p backups
STAMP=$(date +%Y%m%d-%H%M%S)
docker compose exec -T db pg_dump -U "${POSTGRES_USER:-pgm}" "${POSTGRES_DB:-pgm}" | gzip > "backups/pgm-$STAMP.sql.gz"
echo "Backup criado: backups/pgm-$STAMP.sql.gz"
