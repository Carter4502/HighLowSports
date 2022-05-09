const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
const session = require('express-session');
const fs = require('fs');
const xml2js = require('xml2js');
var parser = new xml2js.Parser();
const app = express();
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());
const port = 8081;
var dbCon;
var urlencodedParser = bodyParser.json(({ extended: false }));

fs.readFile(__dirname + '/dbconfig.xml', function(err, data) {
    parser.parseString(data, function(err, result) {
      if (err) throw err;
      app.use(session({
        secret: result.dbconfig.secretkey[0],
        saveUninitialized: true,
        resave: false
      }));
      console.log("Attempting to connect to database.");
      dbCon = mysql.createConnection({
        host: result.dbconfig.host[0],
        user: result.dbconfig.user[0],
        password: result.dbconfig.password[0],
        database: result.dbconfig.database[0],
        port: result.dbconfig.port[0]
      });
      dbCon.connect(function(err) {
        if (err) throw err;
        console.log("Connection to database established.");
      });
    });
});




app.listen(port, () => console.log('Listening on port', port));

app.post('/newPlayer', urlencodedParser, function(req, res) {
    var currency = req.body.currency;
    var compared_to = req.body.compared_to;

    let SQLQuery = `SELECT * FROM sports_players WHERE id != ? ORDER BY RAND () LIMIT 1`;
    dbCon.query(SQLQuery, [compared_to], (err, rows, fields) => {
        if (err) throw err;
        var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log("Sending JSON for random player that doesn't have id = " + compared_to);
        console.log(resultArray);
        return res.json(resultArray);
    });

});

app.post('/getStartingPlayers', urlencodedParser, function(req, res) {
    var currency = req.body.currency;
    let SQLQuery =  `SELECT * FROM sports_players ORDER BY RAND () LIMIT 3`;
    dbCon.query(SQLQuery, (err, rows, fields) => {
        if (err) throw err;
        var resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
        console.log("Sending JSON for first two (random) players.");
        return res.json(resultArray);
    });
});