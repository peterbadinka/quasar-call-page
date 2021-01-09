const express = require('express')
const Tools = require('../Tools')
const {db_1} = require('../db')
app = express()

class MainController{

	static conn(req, res){		

		let json = req.body

		let sql = Tools.sqlUpdate("main_db", json)
		db_1.query(sql, (err, response) => {
			if(err) res.send(err)
			console.log(sql)
			res.send(sql)
		})

	}

}

module.exports = MainController;