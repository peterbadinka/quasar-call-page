const {db_1} = require('../db')
const Tools = require ('../Tools')

class DatabazaController {	

	// getContacts
	static getContacts(req, res) {
		let sql = "SELECT * FROM main_db"
		sql += " WHERE id_user = '"+req.body.dataUser.email+"'"
		if(req.body.filterDate == '<= dnes'){
			sql += " AND datum_akcie <= CURDATE()";
			sql += " AND datum_akcie != '0000-00-00'";
		}
		if(req.body.filterDate == '<= dnes + 7 dní'){
			let date = new Date().getTime() + 86400000 * 7;
			date = Tools.dateToYMD(new Date(date))
			sql += " AND datum_akcie <= '"+date+"'";
			sql += " AND datum_akcie != '0000-00-00'";
		}
		if(req.body.filterDate == '<= dnes + 30 dní'){
			let date = new Date().getTime() + 86400000 * 30;
			date = Tools.dateToYMD(new Date(date))
			sql += " AND datum_akcie <= '"+date+"'";
			sql += " AND datum_akcie != '0000-00-00'";
		}
		sql += " AND check_delete != 'ok'";
		if(req.body.filterDate == '-'){
			sql += " ORDER BY date_reg  DESC"
		} else sql += "ORDER BY datum_akcie ASC"
		sql += " LIMIT 2000";

		db_1.query(sql, (err, result) => {			
			res.send({
				err: err,
				data: result,				
			});
		})
	
	}
	// setContact
	static setContact(req, res) {
		let data = req.body.dataContact
		let sql = "UPDATE main_db SET"
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				sql += " "+key+" = '"+data[key]+"',"
			}
		}
		sql = sql.substring(0, sql.length - 1)
		sql += " WHERE id_person = '"+data.id_person+"'"
		sql += " LIMIT 1"	
		db_1.query(sql, (err, response) => {
			res.send({
				err: err,
				data: response
			})
		})
	}
	// deleteContact
	static deleteContact(req, res) {
		let data = req.body.dataContact
		let sql = "UPDATE main_db SET"
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				sql += " "+key+" = '"+data[key]+"',"
			}
		}
		sql = sql.substring(0, sql.length - 1)
		sql += " WHERE id_person = '"+data.id_person+"'"
		sql += " LIMIT 1"	
		db_1.query(sql, (err, response) => {
			res.send({
				err: err,
				data: response
			})
		})
	}

}

module.exports = DatabazaController