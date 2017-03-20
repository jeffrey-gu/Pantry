var express = require('express'),
    app = express();

app.get('/', function(req, res){
    res.send("Hello world!");
});

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pantry',
  password : 'yummytummy',
  database : 'pantry'
});

connection.connect()

connection.query('SELECT * from users', function (err, rows, fields) {
  if (err) throw err

  console.log('First user is: ', rows[0].first_name)
})

connection.end()

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
