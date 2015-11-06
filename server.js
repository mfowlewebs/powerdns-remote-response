var
  Router = require("koa-router"),
  lookup = require("./domains-lookup"),
  display = require("./domains-result")

function noop(){}

function router(){
	var router = new Router()
	lookup.deprefix= noop
	lookup.parseUrl = noop
	router.get("lookup", "/dnsapi/lookup/:domain/:record", lookup, display)
	return router
}

function koa(){
	
}

function server(){
}

module.exports = server
module.exports.router = router
module.exports.koa = koa
