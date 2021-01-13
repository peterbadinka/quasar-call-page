const 
	express = require('express'),
	CallPageController = require('../controllers/CallPageController')
	Auth = require('../midleware/Auth'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	Route = express.Router()

//=======================================================================
// Routes
//=======================================================================
Route.post('/api/call-page/custom-data', [jsonParser, Auth.key_api], CallPageController.getCustomData)
Route.post('/api/call-page/new-contact', [jsonParser, Auth.key_api], CallPageController.newContact)
Route.post('/api/call-page/update-new', jsonParser, CallPageController.updateNew)
Route.post('/api/call-page/update', jsonParser, CallPageController.update)


module.exports = Route;