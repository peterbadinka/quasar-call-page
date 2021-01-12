const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
// const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const MainRoute = require('./server/routes/MainRoute')
const LoginController = require('./server/controllers/LoginController')

const app = express()
// const corsOptions = {
// 	origin: '*'
// }
// app.use(cors(corsOptions))

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//=======================================================================
// API
//=======================================================================
app.get('/api', (req, res) => { res.send('API v1.0.4') })
app.post('/api/login', jsonParser, LoginController.login)
app.use(MainRoute);

//=======================================================================
// Quasar/Vue App
//=======================================================================
app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))

const port = process.env.PORT || 5000
app.listen(port)