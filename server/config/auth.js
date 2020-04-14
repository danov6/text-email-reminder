var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Require the user model and save it in a variable
var User = mongoose.model('User');

// Export public methods
module.exports = ((jwt,secret) => {
  return {
    signup: (req, res) => {
      console.log("In the reg method ---> users controller".cyan);
      console.log(req.body);
      User.findOne({
        email: req.body.email
      }, (err, oneUser) => {
        if (err) {
          console.log("===== error =====".red);
          res.json({
            error: "An unknown error occurred, please try again."
          });
        } else {
          // 1. User was found
          if (oneUser) {
            console.log("===== user was found =====".yellow);
            res.json({
              error: "Email is already registered. Please login instead."
            });
          } else {
            // 2. No user was found
            console.log("===== user is good to register =====".green);
            var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
            // Create the user object and save into database (hash the password)
            var newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: pw,
              reminders: []
            });
            newUser.save((err,u) => {
              if (err) {
                console.log("===== error when registering =====".red);
              } else {
                console.log("===== successfully registered a new user =====".green);
                let user = {
                  _id: u._id
                };
                let token = jwt.sign(user, secret, {
                    expiresIn: '7d'
                }); // Expires in 1 week
                res.json({
                    user: u,
                    token
                });
              }
            });
          }
        }
      });
    },
    login: (req, res) => {
      console.log("In the login method ---> users controller".cyan);
      console.log(req.body);
      // Find the user with the email
      User.findOne({
        email: req.body.email
      }, (err, oneUser) => {
        if (err) {
          console.log("===== error =====".red);
        } else {
          // 1. User was not found
          if (!oneUser) {
            console.log("===== user was not found =====".yellow);
            res.json({
              error: "Email is not registered. Please register instead."
            });
          } else {
            // 2. No user found
            console.log("===== checking password =====".green);
            // Authenticate password
            if (bcrypt.compareSync(req.body.password, oneUser.password)) {
              console.log("===== successfully logged a user =====".green);
              let user = {
                _id: oneUser._id
              };
              let token = jwt.sign(user, secret, {
                  expiresIn: '7d'
              }); // Expires in 1 week
              res.json({
                user: oneUser,
                token
              });
            } else {
              console.log("===== password incorrect =====".red);
              res.json({
                error: "Password incorrect"
              });
            }
          }
        }
      });
    }
  }
})();