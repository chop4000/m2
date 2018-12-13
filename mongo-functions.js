// Include MongoDB, specifically the MongoClient
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function connectToMongo() {
	
	return new Promise((resolve, reject) => {

		// Connect to local Mongo database using MongoClient
		MongoClient.connect(url, { useNewUrlParser: true }, (err, conn) => {
	
		  	// Error handling.
		  	if (err) throw err;
		  	
		  	// Server logging to confirm progress.
		  	console.log('Connected to Mongo');
		  	
		  	// Resolve connection to Mongo.
		  	resolve(conn);	

		});

	});

}

function listAllMemos(database, myCollection) {

	return new Promise((resolve, reject) => {

		var query = {};
		
		database.collection(myCollection).find(query).toArray(function(err, result) {

			resolve(result);
		
		});

	});

}

function addNewMemo(database, myCollection, memo_text) {

	var objectToInsert = { "memo_text" : memo_text };
	
	database.collection(myCollection).insertOne(objectToInsert, function(err, result) {
    	if (err) throw err;
    });

}

module.exports.connectToMongo = connectToMongo;
module.exports.listAllMemos = listAllMemos;
module.exports.addNewMemo = addNewMemo;