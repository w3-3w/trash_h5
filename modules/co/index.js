function co(gen) {
	function execPointer(err, v, p) {
		const pResult = err ? p.throw(err) : p.next(v);
		if (!(pResult.done)) {
			const promise = pResult.value;
			promise.then(function(result){
				execPointer(null, result, p);
			}, function(error){
				execPointer(error, null, p);
			});
		}
	}
	execPointer(null, null, gen());
}

module.exports = co;