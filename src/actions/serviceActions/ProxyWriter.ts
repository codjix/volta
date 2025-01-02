import { rm } from "fs/promises";
import { ProxyModel } from "@db/models";
import { fileWrite } from "@/utils/fileWrite";
import { render } from "ejs";

type $ProxyHosts = Awaited<ReturnType<typeof ProxyModel.getAll>>;
export const ProxyWriter = async (hosts: $ProxyHosts, target: string) => {
  try {
    const dir = target + "/nginx.d";
    const sslDir = target + "/ssl.d";

    await rm(dir, { recursive: true });
    await rm(sslDir, { recursive: true });

    for (const host of hosts) {
      const content = await render(template, { host, target }, { async: true });
      await fileWrite(`${dir}/${host.id}.conf`, content);

      if (host.cert) {
        const { id, cert, key } = host.cert;

        await fileWrite(`${sslDir}/${id}/cert.pem`, cert);
        await fileWrite(`${sslDir}/${id}/cert.key`, key);
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};

const template = `server {
  # Host ID: <%= host.id %>
  # Created at <%= host.created %>
  # Updated at <%= host.updated %>
  
  # Server name(s)
  server_name <%= host.domains.join(" ") %>;
  listen 80;

  <% if(host.cert){ %>
  # Enable HTTPS
  listen 443 ssl;
  ssl_certificate <%= target %>/ssl.d/<%= host.cert.id %>/cert.pem;
  ssl_certificate_key <%= target %>/ssl.d/<%= host.cert.id %>/cert.key;
  if ($scheme = "http") {
    return 301 https://$host$request_uri;
  }
  <% } %>

  # Logging
  access_log <%= target %>/logs/nginx/host-<%= host.id %>-access.log;
  error_log <%= target %>/logs/nginx/host-<%= host.id %>-error.log warn;

  <% if (host.conf){ %>
  # Custom configurations
  <%= host.conf %>
  <% } %>

  location / {
      proxy_pass <%= host.protocol %>://<%= host.host %>:<%= host.port %>;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      <% if (host.ws){ %>
      # Allow websockets
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;
      <% } %>
  }
}`;
