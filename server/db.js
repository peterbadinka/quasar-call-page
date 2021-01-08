const {createPool} = require('mysql')

const db_1 = createPool({
	host: 'mariadb103.websupport.sk',
	user: 'crm41',		
	database: 'crm41',
	password: 'Oi9}#gH3fw',
	port: 3313
})

module.exports = {
	db_1,
};