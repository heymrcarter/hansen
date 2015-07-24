var express = require('./config/express'),
	contactController = require('./contact'),
	bodyParser = require('body-parser'),
	app = express();
	
app.use(bodyParser.json());

app.post('/contact', function (req, res) {
	console.log(req.body);
	res.status(202).end();
});

app.listen(process.env.PORT)

console.log('Server up and running at http://' + process.env.DOMAIN + ':' + process.env.PORT);