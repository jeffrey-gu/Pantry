var mysql = require("mysql");

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'pantry'
	password : 'yummytummy'
	database : 'pantry'
})

connection.connect();