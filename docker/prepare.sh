#!/bin/sh

if [ -f /app-dist/app.tar.xz ]; then 
  tar xf /app-dist/app.tar.xz -C /
  rm -rf /app-dist/app.tar.xz
  echo "include /app/data/nginx.d/*.conf;" > /etc/nginx/http.d/voltalink.conf
  echo "conf-dir=/app/data/dnsmasq.d/,*.conf" > /etc/dnsmasq.d/voltalink.conf
  printf "auto lo\niface lo inet loopback" > /etc/network/interfaces
  mkdir -p /app/data/logs/nginx
  mkdir -p /app/data/dnsmasq.d
  mkdir -p /app/data/nginx.d
fi

rc-service dnsmasq restart
rc-service nginx restart