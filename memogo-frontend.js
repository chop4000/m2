// F R O N T E N D
//
// -------------------------------------------------
// Declarations / Includes / Requires
// -------------------------------------------------
//
// Express configuration
const express = require('express');
const app = express();
const PORT = 1111;
const path = require('path');
const request = require('request');

// This allows you to serve files directly from the /public directory.
app.use(express.static('public'));

// Body parser middleware to read body on requests that have a body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------------------------------------------
// Routes
// -------------------------------------------------

app.get('/', (request, response) => {

    response.sendFile( 
        path.join( __dirname, './indexcooltime.html' )
    );
    
});

app.get('/load-all-memos', (req1, res1) => {

    const url = `http://localhost:2222/list-all-memos`;
	const opts = {
		method: 'get',
		url: url
	};

	// A Promise will post something, and listen for
	// whatever returns to it.
	return new Promise( (resolve, reject) => {
		
		// When request() is run, it's gonna send out
		// them opts and make a request to wherever, and when
		// its data comes back, it's gonna run that callback
		request(opts, (err2, res2, body2a) => {
			
			if (err2) {
				return reject(err2);
			}
			return resolve(body2a);

		});

	}).then( (body2a) => {
		res1.send( JSON.parse(body2a) );
	} );

});

app.post('/buh', (req1, res1) => {

    const url = `http://localhost:2222/add-new-memo`;
	const opts = {
		method: 'post',
		url: url,
		json: true,
		body: {
			memo_text: req1.body.memo_text
		}
	};

	// A Promise will post something, and listen for
	// whatever returns to it.
	return new Promise( (resolve, reject) => {	

		// When request() is run, it's gonna send out
		// them opts and make a request to wherever, and when
		// its data comes back, it's gonna run that callback, or something....
		request(opts, (err, res, body) => {
			if (err) {
				return reject(err);
			}
			return resolve(body);
		});
	}).then( (body) => {
		res1.send('here is body: ' + body);
	} );

});

// 404 error for all routes not defined
app.all('*', (request, response, next) => {

  response.status(404).send('Dunno about that route primo verde, sorry, 404 on the frontend.');

});

app.listen(PORT, () => console.log(`Node / Express server listening on port ${PORT}...`));
