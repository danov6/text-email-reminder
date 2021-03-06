var mongoose = require('mongoose');
var fs = require('fs');
var models_path = __dirname + '/../models';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://glvaldez:Giordano1!@cluster0-jtnth.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

// Read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach((file) => {
  if (file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
});