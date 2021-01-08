class Auth{

	static valid(req, res, next){
		let access = true
		if(access == true) next()
		else(res.send('Access danied!!!'))
	}

}

module.exports = Auth;