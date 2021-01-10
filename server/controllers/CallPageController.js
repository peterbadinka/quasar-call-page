const {db_1} = require('../db')
const { sqlUpdate } = require('../Tools')
const Tools = require ('../Tools')

class CallPageController {	

	static getCustomData(req, res) {		

		let sqlMesta = ''
		let array = req.body.mesta
		array.forEach(element => {
			sqlMesta += "'"+element+"',"
		});
		sqlMesta = sqlMesta.substring(0, sqlMesta.length - 1)		

		let sql = "SELECT * FROM call_page"
		sql += " WHERE okres IN ("+sqlMesta+")"
		sql += " AND stav != 'nemá záujem - starobný dôchodca'"
		sql += " AND stav != 'číslo neexistuje'"
		sql += " AND stav != 'klient'"
		sql += " AND stav != 'nekontaktovať'"
		sql += " AND blacklist NOT LIKE '%"+req.body.data.email+"%'"
		
		sql += " AND (poznamka LIKE '%"+req.body.searchString+"%'"
		sql += " OR produkt LIKE '%"+req.body.searchString+"%'"
		sql += " OR name_full LIKE '%"+req.body.searchString+"%'"

		sql += " OR poznamka LIKE '%"+req.body.searchString_2+"%'"
		sql += " OR produkt LIKE '%"+req.body.searchString_2+"%'"
		sql += " OR name_full LIKE '%"+req.body.searchString_2+"%'"

		sql += " OR poznamka LIKE '%"+req.body.searchString_3+"%'"
		sql += " OR produkt LIKE '%"+req.body.searchString_3+"%'"
		sql += " OR name_full LIKE '%"+req.body.searchString_3+"%'"

		sql += ")"
		sql += " ORDER BY date_upg"
		sql += " LIMIT 200"

		db_1.query(sql, (err, result) => {
			if(err) res.send(err)
			res.send(result)
		})
	}

}

module.exports = CallPageController