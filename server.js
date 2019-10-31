const express = require('express');
const app = express();
const port = 3000;



// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/timestamp', function(req, res) {
	res.json({ Date: new Date() });
	console.log('working');
});

// listen for requests :)
var listener = app.listen(port, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});

// app.get('/:word/:word2', function(req, res) {
// 	res.json({
// 		word: req.params.word,
// 		word2: req.params.word2,
// 		query: req.query
// 	});
// 	console.log(req.params);
// 	console.log(req.query);
// });

app.get('/api/timestamp/:date_string', function(req, res) {
	String.prototype.isNumber = function() {
		return /^\d+$/.test(this);
	};

	if (req.params.date_string.includes('-')) {
		res.json({
			unix: new Date(req.params.date_string).getTime(),
			utc: new Date(req.params.date_string).toUTCString()
		});
	} else if (req.params.date_string.isNumber()) {
		res.json({
			unix: new Date(parseInt(req.params.date_string)).getTime(),
			utc: new Date(parseInt(req.params.date_string)).toUTCString()
		});
	} else {
		res.json({ error: 'Invalid Date' });
	}

	console.log(req.params.date_string.isNumber());
});
