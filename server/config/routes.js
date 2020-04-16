var users = require('./../controllers/users');

// Define the routes
module.exports = (app, auth, path) => {
  // Auth routes
  app.post('/signup', (req, res) => {
    auth.signup(req, res);
  });
  app.post('/login', (req, res) => {
    auth.login(req, res);
  });
  //User routes
  app.get('/api/user', (req, res) => {
    users.get(req, res);
  });
  // Reminder routes
  app.post('/api/add-reminder', (req,res) => {
    reminders.add(req,res);
  });
  app.post('/api/edit-reminder', (req,res) => {
    reminders.update(req,res);
  });

  app.use(express.static(path.join(__dirname, '/client/build')));

};
