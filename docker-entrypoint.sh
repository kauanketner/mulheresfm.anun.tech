#!/bin/sh
set -e

DATA_DIR="${DATA_DIR:-/data}"

echo "[entrypoint] Inicializando diretório de dados em $DATA_DIR"

# Garante que /data existe
mkdir -p "$DATA_DIR"

# Copia arquivos JSON de seed se ainda não existirem em /data
for f in /app/data-seed/*.json; do
  fname=$(basename "$f")
  if [ ! -f "$DATA_DIR/$fname" ]; then
    cp "$f" "$DATA_DIR/$fname"
    echo "[entrypoint] Seed: $fname"
  fi
done

# Garante diretório de uploads persistente
mkdir -p "$DATA_DIR/uploads"

# Cria symlink public/uploads -> /data/uploads
# (permite que Next.js sirva /uploads/* de forma transparente)
if [ ! -L /app/public/uploads ]; then
  rm -rf /app/public/uploads
  ln -sf "$DATA_DIR/uploads" /app/public/uploads
  echo "[entrypoint] Symlink: public/uploads -> $DATA_DIR/uploads"
fi

echo "[entrypoint] Iniciando Next.js na porta ${PORT:-3000}"
exec npm run start
