module.exports = function (app) {
	app.post('/contact', function (req, res) {
		console.log(req.body);
		res.status(202).end();
	});
};