const express = require('express')
const MainController = require('../controllers/MainController')
const Auth = require('../midleware/Auth')
const Route = express.Router()

//=======================================================================
// Midleware
//=======================================================================
Route.use(Auth.valid)

//=======================================================================
// Routes
//=======================================================================
Route.get('/api/conn', MainController.conn)


module.exports = Route;