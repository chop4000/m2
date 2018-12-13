// B A C K E N D
//
// -------------------------------------------------
// Declarations / Includes / Requires
// -------------------------------------------------
//
// Express configuration
const express = require('express');
const app = express();
const PORT = 2222;
const path = require('path');
const request = require('request');

// Requiring in Mongo connection
const mongo_functions = require('./mongo-functions.js');

// Variables which will be used to store references
let mongoConn;
let memogo_db;
let result_of_mongo_call;

// Body parser middleware to read body on requests that have a body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------------------------------------------
// Routes
// -------------------------------------------------

app.get('/', (request, response) => {

    response.sendFile( 
        path.join( __dirname, './backend.html' )
    );

});

app.get('/list-all-memos', (request, response) => {

    mongo_functions.listAllMemos(memogo_db, 'memogo-collection')
    .then( (result) => {
        
        response.send( result );
    
    });
  
});

app.post('/add-new-memo', (request, response) => {
     
	mongo_functions.addNewMemo(memogo_db, 'memogo-collection', request.body.memo_text);

	response.send("This is data from the add-new-memo backend route.");

});

// 404 error for all routes not defined
app.all('*', (request, response, next) => {

  response.status(404).send('Dunno about that route big boss, sorry, 404 backend.');

});

// -------------------------------------------------
// Mongo connection
// -------------------------------------------------

mongo_functions.connectToMongo() // Making connection to Mongo
.then(conn => {

    mongoConn = conn; // Saving connection to Mongo for reference purposes
    
    memogo_db = mongoConn.db('memogo-database'); 

})
.then(() => {

    // Starting Node server after all database functionality is ready
    app.listen(PORT, () => console.log(`Node / Express server listening on port ${PORT}...`));

})
.catch(err => console.log(err));