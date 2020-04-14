import React, { useState } from 'react';
import './../App.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { setUser } from './../store/actions/user';
import { connect } from 'react-redux';

const CreateAccount = ({ setUser }) => {
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState(''); 
  const history = useHistory();

  const handleCreateAccount = () => {
    setLoading(true);
    //Handle blank fields
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    if(name === '' || email === '' || password === ''){
        setLoading(false);
        setMessage('Please fill in all required fields');
        return;
    }
    axios.post('http://localhost:5000/signup', {
        name,
        email,
        password
    })
    .then((res) => {
        console.log(res);
        let data = res.data;
        if(res.error){
            setMessage(res.error);
        }else{
            //set user in redux
            setUser(data.user);
            //set token in localstorage
            localStorage.setItem('JWT-Token', data.token);
            //send user to their profile
            history.replace('/profile');
        }
        setLoading(false);
    })
    .catch((err) => {
        console.log(err);
        setMessage('An unknown error occurred. Please try again');
        setLoading(false);
    });
  };
  const handleBack = () => {
    history.push("/login");
  };

  return (
    <div>
      <div id="login_container">
        <h3>Create Account</h3>
        <div className="error_message">{message === '' ? '' : message}</div>
        <input name="name" id="name" type="text" placeholder="Full name" required/>
        <input name="email" id="email" type="email" placeholder="Email" required/>
        <input name="password" id="password" type="password" placeholder="Password" required/>
        <div id="account_controls">
          <button name="create_account_button" type="button" onClick={handleCreateAccount}>{loading ? "Creating account..." : "Create Account"}</button>
          <button name="login_button" type="button" onClick={handleBack}>Back to login</button>
        </div>
      </div>
    </div>
  );
}

export default connect(null,{ setUser })(CreateAccount);
