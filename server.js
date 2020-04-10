var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 5000;

require('colors');

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello World!')
});
app.use(express.static(path.join(__dirname, '/client/build'))); //Production
app.use(express.static("./node_modules"));




app.listen(PORT, function() {
    console.log('App is listening on port ' + PORT);
});