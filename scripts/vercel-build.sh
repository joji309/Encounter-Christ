#!/usr/bin/env bash
set -e

python -m pip install --break-system-packages -r requirements.txt
python backend/manage.py collectstatic --noinput --upload-unhashed-files
mkdir -p frontend/public/static
cp -R backend/staticfiles/. frontend/public/static/
npm --prefix frontend run build