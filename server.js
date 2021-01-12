const 
	express = require('express'),
	cors = require('cors')
	serveStatic = require('serve-static'),
	history = require('connect-history-api-fallback'),

	MainRoute = require('./server/routes/MainRoute'),
	LoginController = require('./server/controllers/LoginController'),

	app = express(),

	corsOptions = {
		origin: '*'
	}

	app.use(cors(corsOptions))	

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*")
// 	next()
// })

//=======================================================================
// API
//=======================================================================
app.get('/api', (req, res) => { res.send('API v1.0.4') })
app.get('/api/login/:username/:password', LoginController.login)
app.use(MainRoute);

//=======================================================================
// Quasar/Vue App
//=======================================================================
app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))

//=======================================================================
// PORT
//=======================================================================
port = process.env.PORT || 5000
app.listen(port)