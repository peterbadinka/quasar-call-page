require('dotenv').config()
const {createPool} = require('mysql')

const db_1 = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,		
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT
})

module.exports = {
	db_1,
};