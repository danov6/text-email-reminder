import React, { useState } from 'react';
import './../App.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const [ loading, setLoading ] = useState(false);
  const [ message, setMessage ] = useState(''); 
  const history = useHistory();

  const handleCreateAccount = () => {
    //Handle blank fields
    // if(name === '' || email === '' || password === ''){
    //     setLoading(false);
    //     setMessage('Please fill in all required fields');
    //     return;
    // }
    // axios.post('http://localhost:5000/signup', {
    //     name,
    //     email,
    //     password
    // })
    // .then((res) => {
    //     console.log(res);
    //     history.replace('/profile');
    // })
    // .catch((err) => {
    //     console.log(err);
    //     setMessage('An unknown error occurred. Please try again')
    // });
  };

  const handleBack = () => {
    history.push("/login");
  };

  return (
    <div>
      <div id="login_container">
        <h3>Create Account</h3>
        <div className="error_message">{message === '' ? '' : message}</div>
        <input name="name" type="text" placeholder="Full name" required/>
        <input name="email" type="email" placeholder="Email" required/>
        <input name="password" type="password" placeholder="Password" required/>
        <div id="account_controls">
          <button name="create_account_button" type="button" onClick={handleCreateAccount}>{loading ? "Creating account..." : "Create Account"}</button>
          <button name="login_button" type="button" onClick={handleBack}>Back to login</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
