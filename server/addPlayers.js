
const fs = require('fs');
const xml2js = require('xml2js');
var parser = new xml2js.Parser();
const mysql = require("mysql");
var dbCon;
fs.readFile(__dirname + '/dbconfig.xml', function(err, data) {
    parser.parseString(data, function(err, result) {
      if (err) throw err;
      console.log("Attempting database connection");
      dbCon = mysql.createConnection({
        host: result.dbconfig.host[0],
        user: result.dbconfig.user[0],
        password: result.dbconfig.password[0],
        database: result.dbconfig.database[0],
        port: result.dbconfig.port[0]
      });
      dbCon.connect(function(err) {
        if (err) throw err;
        console.log("Connection established to data base.");
        
        const SQLQuery = "INSERT INTO sports_players (name, salary, sport, position, img_url) VALUES ('Cristiano Ronaldo', 30826598, 'Soccer', 'Forward', 'https://library.sportingnews.com/styles/crop_style_16_9_mobile_2x/s3/2022-05/CristianoRonaldo%20-%20cropped.jpg?itok=OXh7sa7x')"
        dbCon.query(SQLQuery, (err, rows) => {
          if (err) throw err;
          console.log("Record inserted.");
        });

      });
    });
});




