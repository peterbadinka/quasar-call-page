const {db_1} = require('../db')

class Auth{

	static key_api(req, res, next){	
		
		let access = false
		let key_api = req.body.dataUser.key_api
		let _key_api = ''
		let email = req.body.dataUser.email
		let req_count = 0		

		let sql = "SELECT key_api, req_count FROM users WHERE email = '"+email+"'"
		db_1.query(sql, (err, result, field) => {
			req_count = result[0].req_count + 1
			_key_api = result[0].key_api

			sql = "UPDATE users SET req_count = '"+req_count+"'"
			sql += " WHERE email = '"+email+"'"
			db_1.query(sql, (err, result, field) => {
				if(err) res.send('logout')				
			})

			if(_key_api != key_api){
				res.send('logout')
			} 		
			else next()
		})

	}

}

module.exports = Auth;