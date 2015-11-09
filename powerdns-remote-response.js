"use strict"

var
  Koa = require("koa"),
  Router = require("koa-router"),
  Logger = require("koa-logger"),
  Convert = require("koa-convert"),
  Resolve = require("./lookup-resolve"),
  Display = require("./lookup-display"),
  config = require("./config")

function noop(){}

function remoteRoutes(r){
	r= r|| new Router()
	var
	  resolve = new Resolve(),
	  display = new Display()
	resolve.deprefix= noop
	resolve.parseUrl = noop
	r.get("lookup", "/dnsapi/lookup/:domain/:record", resolve, display)
	return r
}

function remoteApp(r, app){
	app = app || new Koa()
	r = r || remoteRoutes()
	app.use(Convert(Logger()))
	app.use(Convert(r.routes()))
	return app
}

function server(){
	var
	  app = remoteApp()
	console.log("App coming up")
	app.listen(config.port)
	console.log("App running")
}

module.exports = server
module.exports.remoteRoutes = remoteRoutes
module.exports.remoteApp = remoteApp

if(require.main === module){
	server()
}
