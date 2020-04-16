import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter, Router, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Profile from './components/Profile';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';

import {setUser, removeUser} from './store/actions/user';

const createBrowserHistory = require("history").createBrowserHistory;

const App = ({setUser, removeUser}) => {
  useEffect(() => {
    let token = localStorage.getItem("JWT-Token");
    if (token != null) {
        axios.defaults.headers.common = {'Authorization': 'Bearer ' + token};
        axios.get("http://localhost:5000/api/user")
        .then(res => {
            const data = res.data;
            if (data && data.error) {
                removeUser();
                localStorage.removeItem("JWT-Token");
                return;
            }
            //set user to redux store
            setUser(res);
        }).catch(err => {
            removeUser();
            localStorage.removeItem("JWT-Token");
            console.log(err);
            return;
        });
    }
  },[]);
  return (
    <Router history={createBrowserHistory()}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/create-account" component={CreateAccount} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path="/article/create" component={CreateArticle} /> */}
        </Switch>
      </BrowserRouter>
    </Router>
  );
}

export default connect(null,{setUser, removeUser})(App);