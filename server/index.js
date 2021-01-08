const express = require('express')
const MainRoute = require('./routes/MainRoute')
const LoginController = require('./controllers/LoginController')
require('dotenv').config()

const app = express()

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

app.get('/', (req, res) => { res.send('api-444 v1.0.0') })
app.get('/login/:username/:password', LoginController.login)

app.use(MainRoute);

const port = process.env.PORT || 8080
app.listen(port)