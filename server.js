var express = require('./config/express'),
	app = express();

app.listen(process.env.PORT)

console.log('Server up and running at http://' + process.env.DOMAIN + ':' + process.env.PORT);