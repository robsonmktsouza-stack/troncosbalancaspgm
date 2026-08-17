#!/bin/sh
set -eu
echo "[PGM] Sincronizando banco..."
npx prisma db push --skip-generate
echo "[PGM] Dados iniciais..."
npm run db:seed
echo "[PGM] Iniciando aplicação..."
exec npm start
