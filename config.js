var
  dns = require("dns")
var
  APPNAME = "PDNSRR_"

console.log("Configuration: beginning")

var
  dnsServers = process.env[APPNAME + "DNS_SERVERS"],
  port = process.env[APPNAME + "PORT"]

if(dnsServers){
	dns.setServers(dnsServers)
	module.export.dnsServers = dnsServers
	console.log("DNS Servers:", dnsServers.join(","))
}else{
	console.log("DNS Servers: system (default)")
}

if(port){
	console.log("Port:", port)
}else{
	port = 5053
	console.log("Port: ", port, "(default)")
}
module.exports.port = port

console.log("Configuration: done")
