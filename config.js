var dns = require("dns")

var APPNAME= "PDNSRR_"

var servesr= process.env[APPNAME + "DNS_SERVERS"]
if(dnsServers)
	dns.setServers(dnsServers)
	console.log("Configured DNS Servers:", dnsServers.join(","))
}else{
	console.log("System DNS Servers:", dnsServers.join(","))
}
