// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp", (req, res) => {
  let date = new Date()
  
  res.json({"unix": date.getTime(), "utc": date.toUTCString()})
})

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string
  
    try {
      let date = new Date(dateString)
      
      if (date.toUtcString() === "Invalid Date") {
        res.json({"error": "Invalid Date"})
        return
      }
      
      res.json({"unix": date.getTime(), "utc": date.toUTCString()})
    } catch (e) {
      res.json({"error": "Invalid Date"})
    }  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});