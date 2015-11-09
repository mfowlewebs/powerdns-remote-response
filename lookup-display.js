"use strict"

// {"result":[{"qtype":"A", "qname":"www.example.com", "content":"203.0.113.2", "ttl": 60}]}

function renderResults(responses){
	var result = []
	if(isNaN(responses.length) || !responses.slice){
		throw new Error("Invalid response")
	}
	for(var i in responses){
		var response = responses[i]
	}
	return { result: result }
}

function display(){
	function*display(next){
		if(!this.results){
			return yield next
		}
		this.body = display.render(this.results)
	}
	display.render = renderResults
	return display
}

module.exports = display
module.exports.renderResults = renderResults
