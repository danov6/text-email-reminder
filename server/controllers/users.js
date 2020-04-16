var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Require the user model and save it in a variable
var User = mongoose.model('User');

// Export public methods
module.exports = (() => {
  return {
    get: (req, res) => {
        if (!req.user) {
            res.json({
                error: ['Not authorized']
            });
        } else {
            User.findOne({
                '_id': req.user._id
            }, {
                'password': 0,
            }).exec().then(u => {
                if (u) {
                    res.json(u);
                } else {
                    res.json({
                        error: ['User not found']
                    });
                }
            }, err => {
                console.log("[ users ] Error finding one user by _id".red, err);
                res.json({
                    error: ['Error fetching user from database']
                });
            });
        }
    }
  }
})();