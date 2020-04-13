import React from 'react';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Profile from './components/Profile';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

import store from './store';

const createBrowserHistory = require("history").createBrowserHistory;

const App = () => {
  return (
    <Router history={createBrowserHistory()}>
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create-account" component={CreateAccount} />
            {/* <Route exact path="/profile" component={Profile} /> */}
            {/* <Route exact path="/article/create" component={CreateArticle} /> */}
          </Switch>
        </Provider>
      </BrowserRouter>
    </Router>
  );
}

export default App;