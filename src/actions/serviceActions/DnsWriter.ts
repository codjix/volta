import { rm } from "fs/promises";
import { DnsModel } from "@db/models";
import { fileWrite } from "@/utils/fileWrite";
import { render } from "ejs";

type $DnsHosts = Awaited<ReturnType<typeof DnsModel.getAll>>;
export const DnsWriter = async (hosts: $DnsHosts, target: string) => {
  try {
    const dir = target + "/dnsmasq.d";

    await rm(dir, { recursive: true });

    const conf = dir + "/dns-hosts.conf";
    const content = await render(template, { hosts }, { async: true });
    await fileWrite(conf, content);

    return true;
  } catch (error) {
    return false;
  }
};

const template = `# DNS Hosts
# Generated at <%= new Date().toUTCString() %>

# ========== Hosts ==========
<% for(const host of hosts){ %>
# Host ID: <%= host.id %>
# Host created at: <%= host.created %>
# Host updated at: <%= host.updated %>
address=/<%= host.domain %>/<%= host.ip %>
<% }; %>`;
