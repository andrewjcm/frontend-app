import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();


  // Handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:8000/api/token/', {
      username: username.value,
      password: password.value,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setLoading(false);
      setUserSession(response.data.access, response.data.refresh, username.value);
      props.handleAuthChange(true);
      navigate('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.resposne && error.response.status === 401) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.")
        console.log(error);
      };
    });
  }

  return (
    <div className="grid-container">
      <div className="grid-item item-login">
        <fieldset>
          <legend>Login</legend>
          <div>
            Username<br />
            <input type="text" {...username} autoComplete="new-password" />
          </div>
          <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password} autoComplete="new-password" />
          </div>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </fieldset>
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;
