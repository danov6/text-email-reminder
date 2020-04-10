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

//If production, uncomment
app.use(express.static(path.join(__dirname, '/client/build')));

//If dev, comment
app.use(express.static(path.join(__dirname, '/client')));

app.use('/api', expressJwt({
    secret: secret
}));

//Database
require('./server/config/mongoose.js');

//Routes
require('./server/config/routes.js')(app);

//Listen
app.listen(PORT, function() {
    console.log('App is listening on port ' + PORT);
});