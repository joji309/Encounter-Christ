#!/usr/bin/env bash
set -e

python -m pip install --break-system-packages -r requirements.txt
python backend/manage.py collectstatic --noinput --upload-unhashed-files
mkdir -p frontend/public/static
cp -R backend/staticfiles/. frontend/public/static/
sed -i "s/addEventListener('unload'/addEventListener('pagehide'/" frontend/public/static/admin/js/admin/RelatedObjectLookups.js
npm --prefix frontend run build