const {db_1} = require('../db')
const Tools = require ('../Tools')
const address = require('address')
const axios = require('axios')

class MainController{

	static conn(req, res){
		
		let sql = "SELECT email FROM users";
		db_1.query(sql, (err, result, field) => {
			res.send(result)
		})

	}

}

module.exports = MainController;