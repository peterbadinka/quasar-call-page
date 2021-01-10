const 
	express = require('express'),
	serveStatic = require('serve-static'),
	history = require('connect-history-api-fallback'),

	MainRoute = require('./server/routes/MainRoute'),
	LoginController = require('./server/controllers/LoginController'),
	CallPageController = require('./server/controllers/CallPageController'),

	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),

	app = express(),
	port = process.env.PORT || 5000

app.listen(port)

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	next()
})

//=======================================================================
// API
//=======================================================================
app.get('/api', (req, res) => { res.send('API v1.0.4') })
app.get('/api/login/:username/:password', LoginController.login)
app.post('/api/call-page/custom-data', jsonParser, CallPageController.getCustomData )
// app.use(MainRoute);

//=======================================================================
// Quasar/Vue App
//=======================================================================
app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))