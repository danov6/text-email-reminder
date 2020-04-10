let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email cannot be blank"],
        unique: true,
        minlength: [3, 'Email is too short'],
        maxlength: [50, 'Email is too long'],
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        minlength: [8, 'Password is too short']
    },
    username: {
        type: String,
        minlength: [1, 'Display name is too short'],
        maxlength: [50, 'Display name is too long'],
        required: [true, "Display name cannot be blank"]
    },
    account_type: {
        type: String,
        default: 'free'
    },
    tokens: {
        reset_password_token: {type: String},
        reset_password_expires: {type: Date},
    }
}, {timestamps: true});

// Generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// -------------
// Return Schema
// -------------
mongoose.model('User', UserSchema);