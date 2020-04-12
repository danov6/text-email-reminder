const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const secret = "JWT-SECRET"; //Replace with something better
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

require('colors');

app.use('/api', expressJwt({
    secret: secret
}));

//Authentication
let auth = require('./server/config/auth')(jwt, secret);

//Database
require('./server/config/mongoose');

//Routes
require('./server/config/routes')(app,auth);

//If production, uncomment
//app.use(express.static(path.join(__dirname, '/client/build')));

//If dev, comment
app.use(express.static(path.join(__dirname, '/client')));

//Listen
app.listen(PORT, function() {
    console.log('App is listening on port ' + PORT);
});