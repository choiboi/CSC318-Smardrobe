/*
 * 
 * This javascript handles the tasks related to maintaining
 * the database, retrieving and deleting clothes in the
 * database.
 *
 */

 $(document).ready(function() {
 	var db = new Database();
 	db.openDB();

 	db.addClothing('asd1123', "23");
 	db.getClothing('asd1', t);
 });

 var t = function(r) {
 	alert(r);
 };


function Database() {


	var dbName = "CLOTHES";
	var dbVersion = "1.0";
	var dbDispName = "Smardrobe Clothes";
	// Allocate 10MB for database.
	var dbSize = 1024 * 1024 * 10;
	var dbCurrSize = 0;
	var db;

	this.openDB = function() {
		db = window.openDatabase("Database", dbVersion, dbDispName, dbSize);
		db.transaction(function(tx) {
			tx.executeSql("CREATE TABLE IF NOT EXISTS " + dbName + " (id unique, clothing, fileSize)");
			dbCurrSize = ;
		});
	};

	this.deleteDB = function() {
		db.transaction(function(tx) {
			tx.executeSql("DROP TABLE IF EXISTS " + dbName);
		}, errorCB);
	}

	this.addClothing = function(ID, clothing) {
		var size = (clothing.length * 4).toString();

		db.transaction(function(tx) {
			tx.executeSql("INSERT INTO " + dbName + " (id, clothing, fileSize) VALUES ('" + ID + "', '" + 
								clothing + "', '" + size + "')");
		}, errorCB);
	};

	this.getClothing = function(ID, cb) {
		db.transaction(function(tx) {
			tx.executeSql("SELECT * FROM " + dbName + " WHERE id='" + ID + "'", [], 
				function(tx, result){
					cb(result.rows.item(0).clothing);
				}, errorCB);
		}, errorCB);
	};

	this.deleteClothing = function(clothingID) {

	};

	this.increaseDBSize = function() {

	};

	var errorCB = function(err) {
		alert("Error processing SQL: " + err.code);
	};
}