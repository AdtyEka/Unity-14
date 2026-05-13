#!/bin/sh
set -e

# Jalankan perintah yang diberikan (misal: php artisan queue:work)
# Jika tidak ada perintah, jalankan apache default
if [ "$#" -gt 0 ]; then
    exec "$@"
else
    exec apache2-foreground
fi
