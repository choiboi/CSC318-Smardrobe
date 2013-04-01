/*
 * 
 * This javascript handles the tasks related to maintaining
 * the database, retrieving and deleting clothes in the
 * database.
 *
 */

//
// This function will store new clothing image into the
// database.
//
// @param nameID - Unique name of the clothing.
// @param clothing - image blob.
//
var addNewClothingDB = function(nameID, clothing) {
	db.addClothing(nameID, clothing);
};

//
// This function will retrieve the specified clothing image
// with the given nameID and make a callback with that image.
//
// @param nameID - Unique name of the clothing.
// @param cb - Callback function.
//
var getClothingDB = function(nameID, cb) {
	db.getClothing(nameID, cb);
};

//
// This function will delete the specified clothing.
//
// @param nameID - Unique name of the clothing.
//
var deleteClothingDB = function(nameID) {
	db.deleteClothing(nameID);
};

$(document).ready(function() {
 	db = new Database();
 	db.openDB();
});

var db;

function Database() {

	var dbName = "CLOTHES";
	var dbVersion = "1.0";
	var dbDispName = "Smardrobe Clothes";
	// Allocate 10MB for database.
	var dbSize = 1024 * 1024 * 10;
	var db;

	this.openDB = function() {
		db = window.openDatabase("Database", dbVersion, dbDispName, dbSize);
		db.transaction(function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS " + dbName + " (id unique, clothing, fileSize)");
		});
	};

	this.deleteDB = function() {
		db.transaction(function(tx) {
			tx.executeSql("DROP TABLE IF EXISTS " + dbName);
		}, errorCB);
	}

	this.addClothing = function(ID, clothing) {
		var size = (clothing.length * 4).toString();
		var query = "INSERT INTO " + dbName + " (id, clothing, fileSize) VALUES ('" + ID + "', '" + 
						clothing + "', '" + size + "')";

		db.transaction(function(tx) {
			tx.executeSql(query);
		}, errorCB);
	};

	this.getClothing = function(ID, cb) {
		var query = "SELECT * FROM " + dbName + " WHERE id='" + ID + "'";
		db.transaction(function(tx) {
			tx.executeSql(query, [], 
				function(tx, result){
					cb(result.rows.item(0).clothing);
				}, errorCB);
		}, errorCB);
	};

	this.deleteClothing = function(ID) {
		var query = "DELETE FROM " + dbName + " WHERE id='" + ID + "'";

		db.transaction(function(tx) {
			tx.executeSql(query);
		}, errorCB);
	};

	// this.increaseDBSize = function() {

	// };

	var errorCB = function(err) {
		alert("Error processing SQL: " + err.code);
	};
}