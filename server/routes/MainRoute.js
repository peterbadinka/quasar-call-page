const 
	express = require('express'),
	MainController = require('../controllers/MainController'),
	CallPageController = require('../controllers/CallPageController')
	Auth = require('../midleware/Auth'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	Route = express.Router()

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*")
		next()
	})

//=======================================================================
// Midleware
//=======================================================================
Route.use(Auth.valid)

//=======================================================================
// Routes
//=======================================================================
Route.post('/api/call-page/custom-data', jsonParser, CallPageController.getCustomData )


module.exports = Route;