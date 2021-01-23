const {db_1} = require('../db')
const Tools = require ('../Tools')

class CallPageController {

	//=======================================================================
	// newContact
	//=======================================================================
	static newContact(req, res){		
		let sql = "SELECT cp_contact_id, cp_contact_send, cp_contact_count FROM users"
		sql += " WHERE email = '"+req.body.dataUser.email+"'"
		sql += " LIMIT 1"
		let cp_contact_id = ''
		let cp_contact_send = ''
		let cp_contact_count = ''
		let newContact = []
		db_1.query(sql, (err, result, field) => {			
			if(err) {res.send(err); return}
			cp_contact_id = result[0].cp_contact_id
			cp_contact_send = result[0].cp_contact_send
			cp_contact_count = result[0].cp_contact_count			
			if(result[0].cp_contact_send != 'false'){
				sql = "SELECT * FROM call_page"
				sql += " WHERE okres = '"+req.body.okres+"'"
				sql += " AND stav != 'nemá záujem - starobný dôchodca'"
				sql += " AND stav != 'číslo neexistuje'"
				sql += " AND stav != 'klient'"
				sql += " AND stav != 'nekontaktovať'"
				sql += " AND blacklist NOT LIKE '"+req.body.dataUser.email+"'"
				sql += " ORDER BY date_upg ASC"
				sql += " LIMIT 1"		
				db_1.query(sql, (err, result, field) => {
					if(err) {res.send(err); return}
					newContact = result[0]
					sql = "UPDATE call_page"
					sql += " SET date_upg = '"+Tools.dateToYMD_hhmmss(new Date())+"'"
					sql += ", id_user = '"+req.body.dataUser.email+"'"
					sql += " WHERE id_string = '"+newContact.id_string+"'"					
					db_1.query(sql, (err, result, field) => {
						if(err) {res.send(err); return}
						cp_contact_count++
						sql = "UPDATE users SET cp_contact_count = '"+cp_contact_count+"'"		
						sql += ", cp_contact_send = 'false'"
						sql += ", cp_contact_id = '"+newContact.id_string+"'"
						sql += " WHERE email = '"+req.body.dataUser.email+"'"
						sql += " LIMIT 1"
						db_1.query(sql, (err, result) => {
							if(err) {res.send(err); return}
							sql = "SELECT * FROM call_page_h"
							sql += " WHERE phone = '"+newContact.phone+"'"
							db_1.query(sql, (err, result) => {							
								res.send({
									newContact: newContact,
									newContact_h: result,
									cp_contact_count: cp_contact_count
								})								
							})							
						})
					})
				})
			}
			else{
				sql = "SELECT * FROM call_page"
				sql += " WHERE id_string = '"+cp_contact_id+"'"
				sql += " LIMIT 1"				
				db_1.query(sql, (err, result) => {
					if(err) {res.send(err); return}
					newContact = result[0]
					sql = "SELECT * FROM call_page_h"
					sql += " WHERE phone = '"+newContact.phone+"'"
					db_1.query(sql, (err, result) => {
						res.send({
							newContact: newContact,
							newContact_h: result,
							cp_contact_count: cp_contact_count
						})						
					})
				})
			}
		})
	}

	//=======================================================================
	// updateNew
	//=======================================================================
	static updateNew(req, res) {

		let data = req.body.dataContact;
		let sql = sqlUpdate(data, 'call_page')
		let upgContact = []

		db_1.query(sql, (err, result, field) => {
			if(err) res.send(err)
			let sql = "SELECT * FROM call_page"			
			sql += " WHERE id_string = '"+data.id_string+"' LIMIT 1"
			db_1.query(sql, (err, result, field) => {
				if(err) res.send(err)
				else {
					result[0].date_akcia = Tools.dateToYMD(result[0].date_akcia)
					result[0].date_reg = Tools.dateToYMD(result[0].date_reg)
					result[0].date_upg = Tools.dateToYMD_hhmmss(result[0].date_upg)
					result[0].id_string = Tools.randString(32)
					upgContact = result[0]
					sql = sqlInsert(result[0], 'call_page_h')
					db_1.query(sql, (err, result, field) => {
						if(err) {res.send(false)}
						else {
							let stav = upgContact.stav
							if(stav == "kontaktovať inokedy" || stav == "dohodnuté stretnutie") {								
								insertToDb(upgContact, 'main_db', stav)
								insertToDb(upgContact, 'main_db_h', stav)
								
								sqlUpdateUserContactData(data, res)
							}
							else {
								sqlUpdateUserContactData(data, res)
							}
						}						
					})
				}					
			})
		})

		//=======================================================================
		// sqlUpdateUserContactData
		//=======================================================================
		function sqlUpdateUserContactData(data, res){
			let sql = "UPDATE users"
			sql += " SET cp_contact_send = 'true'"
			sql += " WHERE email = '"+data.id_user+"'"
			sql += " LIMIT 1"			
			db_1.query(sql, (err, result) => {
				if(err) {res.send(err); return}
				res.send(true)
			})
		}

		//=======================================================================
		// sqlUpdate
		//=======================================================================
		function sqlUpdate(json, tableName){
			let sql = "UPDATE "+tableName+" SET"
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += " "+key+" = '"+json[key]+"',"
				}
			}
			sql = sql.substring(0, sql.length - 1)
			sql += " WHERE id_string = '"+json.id_string+"'"
			sql += " LIMIT 1"
		
			return sql
		}

		//=======================================================================
		// sqlInsert
		//=======================================================================
		function sqlInsert(json, tableName){
			let sql = "INSERT INTO "+tableName+" ("
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += key+", "
				}
			}
			sql = sql.substring(0, sql.length - 2) + ") VALUES("
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += "'"+json[key]+"',"
				}
			}
			sql = sql.substring(0, sql.length - 1) + ")"
		
			return sql
		}

		//=======================================================================
		// insertToDb
		//=======================================================================
		function insertToDb(json, tableName, stav){
			let data = {
				zdroj_kontaktu: 'Studený trh (call page)',
				id_user: json.id_user,
				id_user_reg: json.id_user,
				id_upg: json.id_user,
				name_full: json.name_full,
				phone: json.phone,
				date_upg: json.date_upg,
				datum_akcie: json.date_akcia,
				stav: 'Call-Page - ' + stav,
				poznamka: 'Poznamky: ' + json.poznamka + ', Produkty: ' + json.produkt,
				psc_obec: json.okres,
				id_person: json.id_string,
				call_page: stav,
				typ_akcie: 'insert'
			}
			let sql = sqlInsert(data, tableName)
			db_1.query(sql, (err, result, field) => {
				if(err) return false
				return true	
			})
		}		

	}

	//=======================================================================
	// getHistory
	//=======================================================================
	static getHistory(req, res) {
		let sql = "SELECT * from call_page"
		sql += " WHERE id_user = '"+req.body.dataUser.email+"'"
		sql += " ORDER BY date_upg DESC";
		sql += " LIMIT 100"
		let data = []
		db_1.query(sql, (err, result) => {
			if(err) {res.send({
				data: [result],
				data_h: [],
				err: err
			}); return}			
			data = result
			let phones = ''
			for(let i = 0; i < result.length; i++){
				phones += "'" + result[i].phone + "',"
			}
			phones = phones.substring(0, phones.length - 1)
			sql = "SELECT * FROM call_page_h"
			sql += " WHERE phone IN ("+phones+")"
			sql += " ORDER BY date_upg DESC"
			db_1.query(sql, (err, result) => {
				if(err) {res.send({
					data: [result],
					data_h: [],
					err: err
				}); return}	
				res.send({
					data: data,
					data_h: result
				})
			})
		})
	}

	//=======================================================================
	// getCustomData
	//=======================================================================
	static getCustomData(req, res) {		
		let minTel = 10 //minimum telefonatov

		let sql = "SELECT cp_contact_count FROM users"
		sql += " WHERE email = '"+req.body.dataUser.email+"'"
		db_1.query(sql, (err, result) => {
			if(err) {res.send(err); return}
			if(result[0].cp_contact_count < minTel){
				res.send('<>'); return;				
			}
			else{

				sql = "SELECT * FROM call_page"
				sql += " WHERE okres = '"+req.body.dataContact.mesta+"'"
				sql += " AND stav != 'nemá záujem - starobný dôchodca'"
				sql += " AND stav != 'číslo neexistuje'"
				sql += " AND stav != 'klient'"
				sql += " AND stav != 'nekontaktovať'"
				sql += " AND blacklist NOT LIKE '%"+req.body.dataUser.email+"%'"
		
				let search_1 = req.body.dataContact.searchString;					
				if(search_1.length > 0){				
					sql += " AND (produkt LIKE '%"+search_1+"%'"
					if(req.body.poznamka == true) {
						sql += " OR poznamka LIKE '%"+search_1+"%'"
					}
					sql += " OR stav LIKE '%"+search_1+"%')"
				}		
		
				let search_2 = req.body.dataContact.searchString_2;
				if(search_2.length > 0){
					sql += " AND (name_full LIKE '%"+search_2+"%'"
					sql += " OR phone LIKE '%"+search_2+"%')"
				}
		
				// let search_3 = req.body.dataContact.searchString_3;
				// if(search_3.length > 0){			
				// 	sql += " AND phone LIKE '%"+Tools.formatPhone(search_3)+"%'"
				// }
		
				sql += " ORDER BY date_upg"
				sql += " LIMIT " + req.body.dataUser.app_max_rows
				
				db_1.query(sql, (err, result) => {
					if(err) res.send(err)
					
					if(result.length > 0){
		
						let phones = ''
						for(let i = 0; i < result.length; i++){
							phones += "'" + result[i].phone + "',"
						}
						phones = phones.substring(0, phones.length - 1)
			
						sql = "SELECT * FROM call_page_h"
						sql += " WHERE phone IN ("+phones+")"
						sql += " ORDER BY date_upg DESC"
			
						let data = result;
						db_1.query(sql, (err, result) => {
							if(err) res.send(err)
							res.send({data: data, data_h: result})
						})
		
					} else {
						res.send({data: []})
					}			
		
				})

			}
		})		
	}

	//=======================================================================
	// update
	//=======================================================================
	static update(req, res) {

		let data = req.body.dataContact;
		let sql = sqlUpdate(data, 'call_page')
		let upgContact = []

		db_1.query(sql, (err, result, field) => {
			if(err) res.send(err)
			let sql = "SELECT * FROM call_page"			
			sql += " WHERE id_string = '"+data.id_string+"' LIMIT 1"
			db_1.query(sql, (err, result, field) => {
				if(err) res.send(err)
				else {
					result[0].date_akcia = Tools.dateToYMD(result[0].date_akcia)
					result[0].date_reg = Tools.dateToYMD(result[0].date_reg)
					result[0].date_upg = Tools.dateToYMD_hhmmss(result[0].date_upg)
					result[0].id_string = Tools.randString(32)
					upgContact = result[0]
					sql = sqlInsert(result[0], 'call_page_h')
					db_1.query(sql, (err, result, field) => {
						if(err) {res.send(false)}
						else {
							let stav = upgContact.stav
							if(stav == "kontaktovať inokedy" || stav == "dohodnuté stretnutie") {								
								insertToDb(upgContact, 'main_db', stav)
								insertToDb(upgContact, 'main_db_h', stav)
								res.send(true)
							}
							else {
								res.send(true)
							}
						}						
					})
				}					
			})
		})

		//=======================================================================
		// sqlUpdate
		//=======================================================================
		function sqlUpdate(json, tableName){
			let sql = "UPDATE "+tableName+" SET"
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += " "+key+" = '"+json[key]+"',"
				}
			}
			sql = sql.substring(0, sql.length - 1)
			sql += " WHERE id_string = '"+json.id_string+"'"
			sql += " LIMIT 1"
		
			return sql
		}

		//=======================================================================
		// sqlInsert
		//=======================================================================
		function sqlInsert(json, tableName){
			let sql = "INSERT INTO "+tableName+" ("
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += key+", "
				}
			}
			sql = sql.substring(0, sql.length - 2) + ") VALUES("
			for (var key in json) {
				if (json.hasOwnProperty(key)) {
					sql += "'"+json[key]+"',"
				}
			}
			sql = sql.substring(0, sql.length - 1) + ")"
		
			return sql
		}

		//=======================================================================
		// insertToDb
		//=======================================================================
		function insertToDb(json, tableName, stav){
			let data = {
				zdroj_kontaktu: 'Studený trh (call page)',
				id_user: json.id_user,
				id_user_reg: json.id_user,
				id_upg: json.id_user,
				name_full: json.name_full,
				phone: json.phone,
				date_upg: json.date_upg,
				datum_akcie: json.date_akcia,
				stav: 'Call-Page - ' + stav,
				poznamka: 'Poznamky: ' + json.poznamka + ', Produkty: ' + json.produkt,
				psc_obec: json.okres,
				id_person: json.id_string,
				call_page: stav,
				typ_akcie: 'insert'
			}
			let sql = sqlInsert(data, tableName)
			db_1.query(sql, (err, result, field) => {
				if(err) return false
				return true	
			})
		}		

	}

}

module.exports = CallPageController