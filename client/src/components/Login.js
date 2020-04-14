import React, { useState } from 'react';
import './../App.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setUser } from './../store/actions/user';
import { connect } from 'react-redux';

const Login = ({ setUser }) => {
  const history = useHistory();
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState(''); 

  const handleLogin = () => {
    setLoading(true);
    //Handle blank fields
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    if(email === '' || password === ''){
        setLoading(false);
        setMessage('Please fill in all required fields');
        return;
    }
    axios.post('http://localhost:5000/login', {
        email,
        password
    })
    .then((res) => {
        console.log(res);
        let data = res.data;
        if(data.error){
            setMessage(data.error);
        }else{
            //set user in redux
            setUser(data.user);
            //set token in localstorage
            localStorage.setItem('JWT-Token', data.token);
            //send user to their profile
            history.replace('/profile');
        }
    })
    .catch((err) => {
        console.log(err);
        setMessage('An unknown error occurred. Please try again');
    });
    setLoading(false);
  };
  const handleCreateAccount = () => {
    history.push("/create-account");
  };
  return (
    <div>
      <div id="login_container">
        <h3>Login</h3>
        <div className="error_message">{message === '' ? '' : message}</div>
        <input name="email" id="email" type="email" placeholder="Email" required/>
        <input name="password" id="password" type="password" placeholder="Password" required/>
        <div id="account_controls">
          <button name="login_button" type="button" onClick={handleLogin}>{loading ? "Logging in.." : "Login"}</button>
          <button name="create_account_button" type="button" onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null,{ setUser })(Login);
