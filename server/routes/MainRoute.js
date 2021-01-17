const 
	express = require('express'),
	CallPageController = require('../controllers/CallPageController'),
	DatabazaController = require('../controllers/DatabazaController'),
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
Route.post('/api/call-page/get-history', jsonParser, CallPageController.getHistory)
Route.post('/api/call-page/update', jsonParser, CallPageController.update)
Route.post('/api/databaza/get-contacts', [jsonParser, Auth.key_api], DatabazaController.getContacts)


module.exports = Route;