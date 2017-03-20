var mysql = require("mysql");

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'pantry'
	password : 'yummytummy'
	database : 'pantry'
})

connection.connect();


function User(username, id) {
	this.username = username;
	this.id = id;
	this.pantry = [];
	this.cache = [];
}

function Food(id, user_id, days_to_expiration) {
	this.id = id;
	this.user_id = user_id;
	this.days_to_expiration = days_to_expiration;
}

User.prototype.fillPantry = function(connection) {
	connection.query("SELECT * FROM items where user_id = ?",  [this.id], function(error, results, fields) {
		if(error) throw error;
		console.log(results);
	});
}

User.prototype.addToPantry = function(connection, api_id, is_ingredient=1, days_to_expiration=10) {
	connection.query("INSERT INTO items (api_id, user_id, is_ingredient, days_to_expiration) VALUES (?, ?, ?, ?, ?)", [api_id, this.id, is_ingredient, days_to_expiration], function(error, results, fields) {
		if(error) throw error;
		console.log(results);
	});

}

var joe = Uesr("joe", 1);
joe.addToPantry(connection, 1);