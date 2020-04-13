var users = require('./auth.js/index.js.js');

// Define the routes
module.exports = (app, auth) => {
  // User routes
  app.post('/signup', (req, res) => {
    auth.signup(req, res);
  });
  app.post('/login', (req, res) => {
    auth.login(req, res);
  });
  // Reminder routes
  app.post('/api/add-reminder', (req,res) => {
    reminders.add(req,res);
  });
  app.post('/api/edit-reminder', (req,res) => {
    reminders.update(req,res);
  });
};