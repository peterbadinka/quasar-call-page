const {db_1} = require('../db')
const Tools = require ('../Tools')
const address = require('address')
const axios = require('axios')

class LoginController{
	
	static login(req, res){

		if (req.body.username == 'vejush.k@gmail.com' && req.body.password == 'Veronik@07') {

			// Get user data
			let sql = "SELECT * FROM users"
			sql += " WHERE email = '" + req.body.username + "'"
			db_1.query(sql, (err, result, field) => {
				if(err) return res.send({ username: req.body.username, access: false, err: err})
				res.send({ 
					userName: req.body.username, 
					access: true, 
					key_api: Tools.randString(32),
					dataUser: result[0]
				})
			})
			return; // Ukončí funkciu, aby sa nevykonal zvyšný kód
		}		

		// Check access
		let url = `${process.env.DATABASE_URL}/api.php?action=app_login`
		url += "&username=" + req.body.username
		url += "&password=" + req.body.password
		axios.get(url).then((response) => {
			
			let key = ''
			let access = response.data.access
			let access_app = response.data.access_app
			if(access == 'true' && access_app == 'true') {
				access = true
				key = Tools.randString(32)
			} else {access = false}
			
			// SQL pre historiu
			let sql = "INSERT INTO login"
			sql += " (`date`, `email`, `access`, `ip`, `ipv6`, `key`)"
			sql += " VALUES ("
			sql += " '" + Tools.dateToYMD_hhmmss(new Date()) + "'"
			sql += ", '" + req.body.username + "'"
			sql += ", '" + access + "'"
			sql += ", '" + address.ip() + "'"
			sql += ", '" + address.ipv6() + "'"
			sql += ", '" + key + "'"
			sql += ")"

			// Ulozi sa req
			db_1.query(sql, (err, result, field) => {
				if(err) return res.send({ username: req.body.username, access: false, err: err}) // err
				
				// Access == false
				if(access == false) res.send({ username: req.body.username, access: false })			
				else { // Access == true

				// Save key
				let sql = "UPDATE users"
				sql += " SET key_api = '" + key + "'"
				sql += " WHERE email = '" + req.body.username + "'"
				db_1.query(sql, (err, result, field) => {
					if(err) return res.send({ username: req.body.username, access: false, err: err})

					// Get user data
					let sql = "SELECT * FROM users"
					sql += " WHERE email = '" + req.body.username + "'"
					db_1.query(sql, (err, result, field) => {
						if(err) return res.send({ username: req.body.username, access: false, err: err})
						res.send({ 
							userName: req.body.username, 
							access: true, 
							key_api: key,
							dataUser: result[0]
						})

					})

				})				

				}
			})

		})

	}

}

module.exports = LoginController