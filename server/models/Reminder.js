let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReminderSchema = new Schema({
    message: {
        type: String,
    },
    text_message_enabled: {
        type: Boolean,
    },
    email_enabled: {
        type: Boolean,
    },
}, {timestamps: true});

// -------------
// Return Schema
// -------------
mongoose.model('Reminder', ReminderSchema);
