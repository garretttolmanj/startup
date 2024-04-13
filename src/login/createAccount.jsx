import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { AuthState } from './authState';
import './login.css'

export function CreateAccount(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password1, setPassword1] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const navigate = useNavigate();
    
    async function createUser(userName, password1, password2) {
        if (userName === '' || password1 === '' || password2 === '') {
            window.alert('Username or password cannot be empty');
            return;
        } else if (password1 !== password2) {
            window.alert('Passwords do not match!');
            return;
        }
        const response = await fetch('/api/auth/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ username: userName, password: password1 })
        });
        console.log(response);
        if (response.ok) {
            localStorage.setItem('userName', userName);
            props.onAuthChange(userName, AuthState.Authenticated);
            navigate('/calendar');
        } else {
            window.alert('Invalid username or password');    
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            createUser(userName, password1, password2);
        }
    }
    return (
      <div className='d-flex justify-content-center align-items-center flex-column'>
          <h1>
            Muscle Genius <span><img src="src/image_123650291.JPG" width="80" alt="logo" /></span>
          </h1>
          <div className="bd">
            <div className="container-fluid">
              <form id="loginForm" className="px-4 py-3">
                <div className="mb-3">
                  <label htmlFor="Username" className="form-label">Username</label>
                  <input 
                      type="text"
                      className="form-control"
                      id="Username"
                      placeholder="Username"
                      onChange={(e) => setUserName(e.target.value)}
                      onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">Password</label>
                  <input
                      type="password"
                      className="form-control"
                      id="Password"
                      placeholder="Password"
                      onChange={(e) => setPassword1(e.target.value)}
                      onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) => setPassword2(e.target.value)}
                      onKeyPress={handleKeyPress}
                  />
                </div>
  
                <Button variant='primary' className='d-flex justify-content-center' onClick={() => createUser(userName, password1, password2)}>
                  Create Account
                </Button>
              </form>
            </div>
          </div>
      </div>
  );
  
  }