let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let UserSchema = new Schema({
    name: {
        type: String
    },
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
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reminder'
    }]
}, {timestamps: true});

// Generating a hash
UserSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checking if password is valid
UserSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.password);
};

// -------------
// Return Schema
// -------------
mongoose.model('User', UserSchema);