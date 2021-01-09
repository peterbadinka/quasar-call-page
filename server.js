const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')

const MainRoute = require('./server/routes/MainRoute')
const LoginController = require('./server/controllers/LoginController')

const app = express()
const port = process.env.PORT || 5000

app.listen(port)

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

//=======================================================================
// API
//=======================================================================
app.get('/api', (req, res) => { res.send('API v1.0.1') })
app.get('/api/login/:username/:password', LoginController.login)
app.use(MainRoute);

//=======================================================================
// Quasar/Vue App
//=======================================================================
app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))