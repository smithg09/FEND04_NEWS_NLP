const dotenv = require("dotenv");
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var path = require('path')
var aylien = require("aylien_textapi");
dotenv.config();

// set aylien API credentias
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

console.log(`Your API key is ${process.env.API_KEY}`);

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  //res.sendFile('/dist/index.html', { root: __dirname + '/../..' })
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 3000!");
});

app.post("/test", function (req, res) {
  console.log(" /test api call for POST request");
  console.log(req.body);

  textapi.sentiment(
    {
      url: req.body.url,
    },
    function (error, response , rateLimits) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(rateLimits);
      console.log(response);
      res.json(response);
    }
  );
});