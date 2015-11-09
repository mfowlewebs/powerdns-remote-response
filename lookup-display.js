"use strict"

// {"result":[{"qtype":"A", "qname":"www.example.com", "content":"203.0.113.2", "ttl": 60}]}

// https://github.com/cmouse/pdns-remotebackend-module
// { "result": [ { "qtype": "SOA", "qname": "example.com", "content": "dns1.icann.org. hostmaster.icann.org. 2012080849 7200 3600 1209600 3600", "ttl": 3600, "priority": 0, "domain_id": -1 } ] }

function renderSOA(record){
	return {
		"qtype": this.params.record,
		"qname": this.params.domain,
		"content": [record.nsname, record.hostnaster, record.serial, record.refresh, record.retry].join(" "),
		"ttl": record.minttl,
		"primary": 0,
		"domain_id": -1
	}
}

function renderANY(record){
}

function display(){
	function*display(next){
		if(!this.results){
			console.error("unknown request '" + this.url + "'")
			return yield next
		}
		var self = this
		yield Promise.resolve(this.results).then(function(lookedUp){
			var jsonRecord = display["render" + self.params.record].call(self, lookedUp)
			self.body = { result: [ jsonRecord ] }
			self.set("content-type", "application/json")
		})
		yield next
	}
	display.renderSOA = renderSOA
	display.renderANY = renderANY
	return display
}

module.exports = display
module.exports.renderSOA = renderSOA
module.exports.renderANY = renderANY
