import React, { useState } from 'react';
import './../App.css';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [ loading, setLoading ] = useState(false);
  const handleLogin = () => {
    //Handle blank fields
    // if(email === '' || password === ''){
    //     setLoading(false);
    //     setMessage('Please fill in all required fields');
    //     return;
    // }
    // axios.post('http://localhost:5000/login', {
    //     email,
    //     password
    // })
    // .then((res) => {
    //     console.log(res);
    //     //handle response
    //     history.replace('/profile');
    // })
    // .catch((err) => {
    //     console.log(err);
    //     setMessage('An unknown error occurred. Please try again')
    // });
  };
  const handleCreateAccount = () => {
    history.push("/create-account");
  };
  return (
    <div>
      <div id="login_container">
        <h3>Login</h3>
        <input name="email" type="email" placeholder="Email" required/>
        <input name="password" type="password" placeholder="Password" required/>
        <div id="account_controls">
          <button name="login_button" type="button" onClick={handleLogin}>Login</button>
          <button name="create_account_button" type="button" onClick={handleCreateAccount}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
