"use strict"

var
  dns = require("dns")

var prefix = "/dnsapi/lookup"
function deprefix(){
	if(this.url.startsWith(prefix.length)){
		this.url = this.url.substring(prefix.length)
	}
}

function parseUrl(){
	var components= this.url.split("/")
	if(components.length != 3){
		throw new Error("URL parse")
	}
	components.unshift()
	this.params = this.params|| {}
	this.params.domain = components[1]
	this.params.record = components[2]
	return components
}

function parseHeaders(){
	this.params.remote = this.header["x-remotebackend-remote"]
	this.params.local= this.header["x-remotebackend-local"]
	this.params.realRemote = this.headers["x-remotebackend-real-remote"]
	this.params.zoneId = this.headers["x-remotebackend-zone-id"]
	if(!this.params.remote || !this.params.local || !this.params.realRemote || !this.params.zoneId){
		throw new Error("Headers missing")
	}
}

function resolve(domain, record){
	return new Promise(function(resolve, reject){
		console.log("resolve", domain, record)
		dns.resolve(domain, record, function(err, address){
			if(err){
				reject(err)
			}else{
				resolve(address)
			}
		})
	})
}

function lookup(){
	function*handler(next){
		handler.deprefix.call(this)
		handler.parseUrl.call(this)
		handler.parseHeaders.call(this)
		this.results = resolve.call(this, this.params.domain, this.params.record)
		yield next
	}
	handler.deprefix = deprefix
	handler.parseUrl = parseUrl
	handler.parseHeaders = parseHeaders
	handler.resolve = resolve
	return handler
}

module.exports = lookup
module.exports.deprefix = deprefix
module.exports.parseUrl = parseUrl
module.exports.parseHeaders = parseHeaders
module.exports.resolve = resolve
