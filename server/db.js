const {createPool} = require('mysql')

const db_1 = createPool({
	host: 'mariadb105.r6.websupport.sk',
	user: 'vejushk',		
	database: 'deb85ddu',
	password: 'Veronik@0708',
	port: 3315
})

module.exports = {
	db_1,
};