#!/bin/sh
set -eu
FILE=${1:-}
if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then echo "Uso: sh scripts/restore.sh backups/arquivo.sql.gz"; exit 1; fi
gunzip -c "$FILE" | docker compose exec -T db psql -U "${POSTGRES_USER:-pgm}" "${POSTGRES_DB:-pgm}"
echo "Restauração concluída."
