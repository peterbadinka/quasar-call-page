const 
	express = require('express'),
	MainController = require('../controllers/MainController'),
	Auth = require('../midleware/Auth'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	Route = express.Router()

//=======================================================================
// Midleware
//=======================================================================
Route.use(Auth.valid)

//=======================================================================
// Routes
//=======================================================================
Route.post('/api/conn', jsonParser, MainController.conn )


module.exports = Route;