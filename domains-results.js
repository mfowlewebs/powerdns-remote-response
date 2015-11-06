function renderResults(responses){
	var result = []
	if(isNaN(responses.length) || !responses.slice){
		throw new Error("Invalid response")
	}
	
}

function display(){
	function*display(next){
		if(!this.results){
			return yield next
		}
		this.body = display.render(this.results)
	}
	display.render = renderResults
}

module.exports = display
module.exports.renderResults = renderResults

{"result":[{"qtype":"A", "qname":"www.example.com", "content":"203.0.113.2", "ttl": 60}]}
